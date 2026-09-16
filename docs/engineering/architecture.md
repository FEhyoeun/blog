# Architecture

## 개요 (Overview)

이 Repository는 두 개의 browser application을 포함하는 npm workspaces 및 Turborepo monorepo다.

- `apps/client`: Next.js App Router로 구현한 공개 블로그.
- `apps/admin`: React/Vite single-page application으로 구현한 관리자 interface.

두 application은 `@supabase/supabase-js`를 사용해 외부 Supabase project와 직접 통신한다. Repository에는 application이 소유한 backend server, API route layer, ORM, database migration layer가 없다.

```text
공개 사용자 ──> Next.js client ────────> Supabase table API / RPC ──> data store
관리자 ──────> React/Vite admin ──────> Supabase Auth + table API ──> data store
```

따라서 browser와 Supabase 사이의 경계는 이 Repository code의 API boundary이면서 persistence boundary다.

## Repository 구조

- `apps/client/`는 공개 routing, 페이지 구성, 블로그 표시, 공개 post 조회를 담당한다.
- `apps/admin/`은 관리자 UI, authentication으로 보호되는 navigation, dashboard query, post 관리를 담당한다.
- `packages/shared/`는 두 application이 공유하는 source-level code를 포함한다. 여기에는 Supabase client factory, domain type, utility가 있다.
- `packages/admin-auth/`는 admin application이 사용하는 authentication context를 포함한다.
- `package.json`은 npm workspaces를 정의하고 Repository task를 Turborepo에 위임한다.
- `turbo.json`은 공통 `dev`, `build`, `lint`, `type-check` task graph를 정의한다.

`packages/` 아래 directory에는 자체 package manifest가 없다. 독립적으로 package화된 workspace artifact가 아니라 TypeScript와 Vite path alias를 통해 source로 사용된다. 관련 configuration은 `tsconfig.json`, `apps/client/tsconfig.json`, `apps/admin/vite.config.ts`에서 확인할 수 있다.

## Frontend Architecture

### 공개 client

`apps/client`는 Next.js 15 App Router와 React 19를 사용한다. Route segment와 layout은 `apps/client/src/app/` 아래에 있다. Root layout은 공통 header와 footer를 구성하고 route tree를 client-side TanStack Query provider 안에 배치한다.

- `apps/client/src/app/layout.tsx`
- `apps/client/src/components/QueryProvider.tsx`

Client 전용 동작이 없는 페이지는 기본적으로 server component로 유지된다. `activities`, post 목록, post 상세처럼 상호작용이 있는 route는 `'use client'`를 선언한다. Post route는 remote state에 TanStack Query를 사용하고, local interaction state에는 React state와 effect를 사용한다. 정적 profile 및 activity content는 `apps/client/src/mock/`에 저장한다.

공개 route는 file-system routing을 사용한다. 주요 route group은 home, about, activities, post 목록, dynamic post 상세 페이지다. 공통 navigation은 `apps/client/src/components/`에 구현되어 있다.

공개 post 목록과 상세 페이지는 `apps/client/src/supabase.ts`에서 browser용 Supabase client를 가져온다. 두 페이지는 `posts` relation을 직접 조회하며, 상세 페이지는 `increment_post_views` RPC도 호출한다. 이 동작 사이에 Next.js Route Handler나 Server Action은 없다.

Styling은 Tailwind CSS utility와 `apps/client/src/app/globals.css`의 global stylesheet를 사용한다. Markdown content는 `react-markdown`과 `remark-gfm`으로 rendering한다.

### Admin client

`apps/admin`은 React 18과 Vite를 사용한다. `apps/admin/src/main.tsx`가 application을 mount하고, `apps/admin/src/App.tsx`는 다음 항목을 구성한다.

- 공통 TanStack Query client
- Supabase 기반 `AuthProvider`
- React Router browser routing
- authentication을 거친 관리자 shell

React Router는 `/login`과 보호된 `/` route를 노출한다. 보호된 shell 내부에서는 별도의 URL route 대신 local component state로 dashboard, post management, analytics view를 선택한다.

Admin data access는 view component와 같은 위치에 있다. `Dashboard.tsx`는 post 수와 최근 post를 조회한다. `PostManagement.tsx`는 Supabase client를 통해 post를 직접 조회·변경하고 Markdown editor와 preview를 rendering한다. Analytics view는 현재 persistence 또는 analytics service 대신 component 내부 mock data를 사용한다.

Admin application은 `apps/admin/src/index.css`, `apps/admin/tailwind.config.js`, `apps/admin/postcss.config.js`를 통해 Tailwind CSS를 사용한다.

## Backend Architecture

Repository 내부에는 backend runtime이나 일반적인 route/controller/service/repository stack이 없다. Next.js API route, Server Action, 독립 server application, ORM configuration, schema migration file, local database runtime도 존재하지 않는다.

외부 Supabase project가 이 code에서 사용하는 다음 backend 기능을 제공한다.

- Supabase Auth를 통한 authentication
- Supabase table API를 통한 relation 조회 및 mutation
- `increment_post_views` RPC를 통한 조회수 변경

Application 수준의 data orchestration과 error handling은 frontend component와 context에 있다. Query function은 일반적으로 Supabase가 반환한 error를 TanStack Query에 throw하거나 local log로 남긴다. Post form validation은 component와 HTML 동작으로 제한되며 공통 runtime validation layer는 없다.

## Data Flow

### 공개 post 목록과 검색

```text
사용자가 /posts를 열거나 검색
  -> apps/client/src/app/posts/page.tsx
  -> apps/client/src/supabase.ts
  -> packages/shared/src/supabaseClient.ts
  -> Supabase가 posts relation을 조회
  -> TanStack Query 또는 local search state가 결과를 수신
  -> 페이지가 post 목록을 rendering
```

목록 query는 결과를 `status = published`로 제한하고 생성 시간순으로 정렬하며 range 기반 pagination을 적용한다. 검색은 post 제목과 content에 대한 Supabase filter로 표현하며 local component state에 별도로 저장한다.

### 공개 post 상세

```text
사용자가 /posts/[id]를 엶
  -> apps/client/src/app/posts/[id]/page.tsx
  -> Supabase가 id로 posts record 하나를 조회
  -> TanStack Query가 record를 저장하고 rendering
  -> 페이지가 increment_post_views를 호출
  -> 상세 query를 invalidate하고 다시 조회
```

상세 select는 `id`를 key로 사용하며, 목록 route가 사용하는 `published` status filter는 추가하지 않는다.

### Admin authentication 및 post 관리

```text
관리자가 admin SPA를 엶
  -> packages/admin-auth/src/AuthContext.tsx가 현재 Supabase user를 요청
  -> apps/admin/src/components/ProtectedRoute.tsx가 / 또는 /login을 선택
  -> authentication을 거친 view가 apps/admin/src/supabase.ts를 사용
  -> PostManagement가 post를 조회, 생성, 수정 또는 삭제
  -> Supabase 응답으로 component state를 갱신
```

Admin UI가 post를 생성할 때 현재 user ID를 `author_id`로 포함한다.

## Data 및 Persistence

Supabase는 현재 유일한 persistence integration이다. 두 application은 `packages/shared/src/supabaseClient.ts`를 통해 client를 생성하며, 이 모듈에는 project URL과 browser client key가 필요하다.

Shared source가 표현하는 중심 domain은 `packages/shared/types/post.ts`에 수동으로 정의한 `Post`다. 이 type은 식별자, 제목, Markdown content, 작성자 식별자, 발행 상태, 조회수, timestamp, 선택적 tag를 포함한다. 이 type은 Repository에 포함된 database schema에서 생성된 것이 아니다.

Code에는 정적 profile 및 activity data도 있다. 이 값은 `apps/client/src/mock/`에서 import하며 Supabase에서 불러오지 않는다.

## 인증 및 권한 (Authentication & Authorization)

Authentication은 admin application에만 존재한다. `packages/admin-auth/src/AuthContext.tsx`는 Supabase Auth operation을 감싸고 React context를 통해 현재 user, loading state, login, logout을 제공한다. Application을 시작할 때 `auth.getUser()`를 호출한다. Login은 `auth.signInWithPassword()`, logout은 `auth.signOut()`을 사용한다.

`apps/admin/src/components/ProtectedRoute.tsx`는 이 context를 사용해 authentication되지 않은 user를 `/login`으로 redirect한다. 이는 client-side navigation boundary이며 database authorization boundary가 아니다.

Repository에는 Supabase RLS policy나 다른 server-side authorization definition이 없다. 따라서 이 code만으로 table 조회 및 mutation의 authorization을 확인할 수 없다.

## Environment 및 Runtime 경계

Root `package.json`은 Turborepo를 사용해 두 application을 실행한다. Local development에서 Next.js client는 기본 development port를 사용하고, Vite admin server는 `apps/admin/vite.config.ts`에서 port `3001`로 설정되어 있다.

각 browser application은 별도의 environment variable namespace를 사용한다.

- `NEXT_PUBLIC_SUPABASE_URL`과 `NEXT_PUBLIC_SUPABASE_ANON_KEY`는 `apps/client`를 설정한다.
- `VITE_SUPABASE_URL`과 `VITE_SUPABASE_ANON_KEY`는 `apps/admin`을 설정한다.

여기에는 이름과 역할만 기록하며 실제 값은 의도적으로 제외한다. URL 또는 key가 없으면 shared factory는 client 생성 과정에서 error를 throw한다.

Client는 `apps/client/package.json`의 Next.js script를 통해 build하고 serve한다. Admin은 `apps/admin/package.json`을 통해 Vite static output으로 build한다. Repository에는 두 output을 함께 또는 별도로 hosting하는 방식을 정의한 deployment manifest가 없다.

## 현재 Architecture 제약

- Browser application은 Supabase client API 및 table/RPC 이름에 직접 결합되어 있다. UI code와 Supabase 사이에 Repository가 소유한 backend abstraction은 없다.
- RLS와 policy definition이 없으므로 database security와 authorization은 checked-in implementation의 범위 밖에 있다.
- Shared code는 Repository path alias를 통해 결합되어 있다. `packages/admin-auth/src/AuthContext.tsx`는 admin application의 Supabase instance도 import하므로 shared authentication source가 app-specific module에 의존한다.
- 두 application은 서로 다른 React 및 Tailwind CSS major version을 사용하며, framework build pipeline도 분리되어 있다.
- Remote query, mutation, error handling logic은 service module로 분리되지 않고 주로 UI component와 같은 위치에 있다.
- Persistence data contract는 수동으로 관리하는 TypeScript type으로 표현되며, 일치 여부를 확인할 checked-in schema나 generated database type이 없다.

## Known Unknowns

다음 architecture 관련 정보는 이 Repository에서 확인할 수 없다.

- 배포된 Supabase schema, constraint, default, index, relation
- RLS 활성화 여부와 anonymous 및 authenticated client에 적용되는 read/write policy
- `increment_post_views`의 implementation, permission, transaction 동작
- Supabase Auth provider configuration과 권한이 있는 관리자를 식별하는 규칙
- Production hosting topology, environment configuration, client와 admin deployment의 관계

이 항목은 외부 Supabase 또는 deployment configuration의 근거가 필요하며, frontend 동작만으로 추론해서는 안 된다.

## 주요 File Reference

- Workspace orchestration: `package.json`, `turbo.json`
- Shared compiler alias: `tsconfig.json`
- 공개 application configuration: `apps/client/package.json`, `apps/client/next.config.ts`, `apps/client/tsconfig.json`
- 공개 application 구성: `apps/client/src/app/layout.tsx`
- 공개 data access: `apps/client/src/app/posts/page.tsx`, `apps/client/src/app/posts/[id]/page.tsx`, `apps/client/src/supabase.ts`
- Admin application configuration: `apps/admin/package.json`, `apps/admin/vite.config.ts`, `apps/admin/tsconfig.json`
- Admin 구성 및 routing: `apps/admin/src/App.tsx`, `apps/admin/src/components/ProtectedRoute.tsx`
- Admin persistence access: `apps/admin/src/components/Dashboard.tsx`, `apps/admin/src/components/PostManagement.tsx`, `apps/admin/src/supabase.ts`
- Authentication context: `packages/admin-auth/src/AuthContext.tsx`
- Shared Supabase factory 및 domain type: `packages/shared/src/supabaseClient.ts`, `packages/shared/types/post.ts`
