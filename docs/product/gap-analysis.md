# Current → Target Gap Analysis

> Target Product의 Source of Truth는 `docs/product/product-definition.md`다. Current State는 `docs/reconnaissance/repository-reconnaissance.md`, `docs/engineering/architecture.md`, 필요한 범위에서 확인한 현재 code와 configuration을 근거로 한다. 이 문서는 Requirements, Acceptance Criteria 또는 backlog가 아니다.

## Executive Summary

현재 Repository에는 공개 블로그의 기본 정보 화면, 게시글 목록·검색·상세, Markdown rendering, `Draft`/`Published` 상태, 관리자 인증 UI와 게시글 CRUD UI가 구현되어 있다. About과 Activities는 Target Product의 기본 정보 범위를 이미 제공한다.

가장 큰 confirmed gap은 콘텐츠 중심 Home, Topics 기반 탐색과 관리, `Post`의 summary·slug·cover image, URL-based Pagination, 게시글별 discoverability 정보, sitemap, syntax highlighting, 외부 Analytics integration이다. Target에서 제외한 Mock Analytics Dashboard와 현재의 자기소개 중심 Home은 Target 방향과 명확히 충돌한다.

Supabase의 실제 schema·RLS·RPC, 인증과 CRUD의 runtime 동작, Draft 직접 접근 차단, Production 배포 상태, Desktop/Mobile 사용성, Accessibility, crawl/index 결과는 Repository만으로 확정할 수 없어 검증이 필요하다.

## Gap Matrix

| Area | Target | Current Evidence | Status | Gap |
|---|---|---|---|---|
| Home | 콘텐츠 중심 Entry Point, Minimal Author Identity, Recent/Featured Posts, Topics | Home은 자기소개, 경력 이동, skill 목록 중심이며 post/topic section이 없음 | `Needs Removal / Replacement` | 현재 Home 구성을 Target의 콘텐츠 중심 구조로 대체해야 하는 차이 |
| Blog | Published Post List | `/posts`가 published post를 최신순으로 조회·표시 | `Satisfied` | 확인된 code-level gap 없음 |
| Post | 고유 상세 화면과 Markdown reading | `/posts/[id]`와 Markdown renderer가 존재 | `Partial` | syntax highlighting 및 완전한 reading Quality Bar 미충족 |
| About | Introduction, Career, Education, Contact | 네 영역이 정적 콘텐츠로 구현됨 | `Satisfied` | 확인된 gap 없음 |
| Activities | Projects, Talks/Content, Community, Learning/Knowledge Sharing | Project, Presentation, Study 활동과 관련 내용이 구현됨 | `Satisfied` | 확인된 gap 없음 |
| Search | Published content 검색 | 제목/본문 검색이 있으나 검색 pagination과 count 표시가 불완전 | `Partial` | 검색 결과의 완전한 pagination flow 부족 |
| Topics discovery | Topic을 통한 콘텐츠 탐색 | `tags`를 표시하지만 선택·filter·topic route가 없음 | `Partial` | 표시용 `tags`를 넘어선 Topics 탐색이 없음 |
| URL-based Pagination | URL이 현재 목록/검색 page를 표현 | `currentPage` component state만 사용하고 URL query/path를 사용하지 않음 | `Missing` | URL 기반 page state 없음 |
| Unified Post model | 모든 글을 하나의 `Post`로 관리 | 하나의 shared `Post` type과 `posts` relation을 사용 | `Satisfied` | 확인된 gap 없음 |
| Post summary | `Summary / Description` | shared `Post` type, editor, list에 독립 summary field가 없음 | `Missing` | summary data 및 관리/표시 없음 |
| Post slug | `Slug`와 콘텐츠 고유 URL | 상세 URL이 numeric `id`를 사용하고 slug field가 없음 | `Missing` | slug data와 slug routing 없음 |
| Post topics | `Topics`, category hierarchy 미사용 | `tags?: string[]`만 존재하고 topic contract는 없음; Post category는 없음 | `Partial` | `tags`와 Target Topics의 contract 및 discovery가 정립되지 않음 |
| Cover image | `Cover Image` | shared type, admin editor, public post UI에 cover image field가 없음 | `Missing` | cover image data와 UI 없음 |
| Markdown content | Markdown 기반 단일 content | Admin editor/preview와 public `react-markdown` rendering 존재 | `Satisfied` | 기본 Markdown pipeline은 존재 |
| Post status | `Draft`, `Published` | type, admin selector, create/update에 두 상태가 존재 | `Satisfied` | 확인된 code-level gap 없음 |
| Draft isolation | Draft를 URL/API/discovery에서 public 차단 | 목록·검색은 published filter 사용; 상세는 id만 조회; RLS는 미확인 | `Partial` | public detail code에 status 제한이 없고 server-side 차단은 검증 불가 |
| Preview | Author가 Draft Preview 가능 | Admin editor에 Markdown preview가 있고 기존 draft도 편집 가능 | `Satisfied` | editor 내부 preview implementation 존재 |
| Publish/Edit | Publish 후 수정·갱신 | Admin에서 status 선택, insert/update UI와 호출 존재 | `Needs Verification` | 실제 Auth/RLS 환경에서 persistence 동작 확인 필요 |
| Admin CRUD | Single-author Post 생성·수정·삭제 | CRUD UI와 Supabase 호출이 존재 | `Needs Verification` | 실제 계정, 권한, DB 동작이 검증되지 않음 |
| Topic management | Admin에서 Topic 관리 | comma-separated `tags` 추가·제거만 존재 | `Partial` | Target Topics로서의 관리 contract와 동작이 불충분 |
| Crawl / Index | Published content crawl/index 가능 | crawler 동작과 Production rendering 결과가 검증되지 않음 | `Needs Verification` | 실제 검색엔진 접근 및 index 결과 확인 필요 |
| Metadata | 적절한 metadata | Root layout에 generic title/description만 존재 | `Partial` | post별 metadata와 content 정보 반영 없음 |
| Canonical | Canonical URL 제공 | canonical 설정이나 metadata가 검색되지 않음 | `Missing` | canonical 없음 |
| Open Graph | Open Graph 정보 제공 | Open Graph 설정이나 metadata가 검색되지 않음 | `Missing` | Open Graph 없음 |
| Sitemap | Published Post를 포함하는 sitemap | sitemap file/route/configuration이 없음 | `Missing` | sitemap 없음 |
| Article / Author information | 기계가 이해할 수 있는 Article/Author 정보 | 관련 structured metadata 구현이 없음 | `Missing` | Article/Author 표현 없음 |
| Semantic structure | Semantic content structure | 상세에 `article`, `header`, `time`, heading을 사용 | `Partial` | 전체 content/discovery 구조와 machine-readable 의미는 제한적 |
| Draft discovery exclusion | Draft를 Search/Topics/Sitemap에서 제외 | Search/list는 published filter; Topics/Sitemap은 미구현 | `Partial` | 구현된 discovery 일부만 Draft 제외를 적용 |
| External Analytics | 외부 service로 Traffic/Acquisition/Consumption 파악 | 외부 Analytics integration이 없음 | `Missing` | 운영 Analytics 연결 없음 |
| Mock Analytics Dashboard | Target 핵심 범위에서 제외 | Admin에 mock/static/random Analytics tab이 존재 | `Needs Removal / Replacement` | Target과 충돌하는 자체 mock dashboard가 남아 있음 |
| Responsive Public UI | Desktop/Mobile 핵심 flow 정상 사용 | breakpoint class는 있으나 일부 overflow 가능성과 미연결 mobile pagination 존재 | `Partial` | 확인된 mobile interaction gap과 실제 device 검증 부족 |
| Responsive Admin | Desktop 중심, 기본 Responsive 품질 | responsive class가 있으나 실제 device 동작 미검증 | `Needs Verification` | Desktop/Mobile manual verification 필요 |
| Loading state | 핵심 flow에 적절한 loading state | 상세 skeleton은 있으나 목록은 loading 중 null, admin은 단순 text | `Partial` | 목록과 주요 admin flow의 loading experience 부족 |
| Empty state | 핵심 flow에 적절한 empty state | 목록 empty UI가 있으나 일반 0건에도 검색 전용 문구 사용 | `Partial` | context에 맞는 empty state 부족 |
| Error state | 핵심 flow에 사용자-facing error state | 상세 error UI는 있으나 목록은 null, Admin CRUD는 console 중심 | `Partial` | 목록과 Admin의 사용자-facing error state 부족 |
| Accessibility | 기본 Accessibility | 일부 semantic element와 label은 있으나 audit 결과가 없음 | `Needs Verification` | keyboard, focus, screen reader 및 전체 semantic 검증 필요 |
| Markdown reading | Target Markdown 요소와 긴 글/mobile readability | GFM renderer와 일부 prose style 존재 | `Partial` | syntax highlighting이 없고 긴 글/mobile 품질은 미검증 |
| Syntax highlighting | Code block syntax highlighting | syntax highlighting library/configuration이 없음 | `Missing` | syntax highlighting 없음 |
| Performance / SEO verification | Production 품질을 측정·검증 가능 | 관련 script, test, Lighthouse configuration이 없음 | `Missing` | 측정 가능한 verification capability 없음 |
| Public Blog Production | 실제 Production에서 사용 가능 | build script는 있으나 build 및 deployed service가 확인되지 않음 | `Needs Verification` | build/runtime/deployment evidence 필요 |
| Admin Production | 실제 Production에서 사용 가능 | Vite build script는 있으나 production serving/topology가 확인되지 않음 | `Needs Verification` | build, hosting, SPA routing 검증 필요 |
| Authentication | Authenticated Author만 Admin 접근 | Supabase Auth context와 protected route 존재 | `Needs Verification` | 실제 login 성공/실패와 author identity 확인 필요 |
| Authorization | 실제 data/API 접근에 권한 적용 | Repository에 RLS/policy definition이 없음 | `Needs Verification` | anonymous/authenticated data permission 확인 필요 |
| Secret protection | Secret/Credential을 client/public Repository에 노출하지 않음 | browser용 public env namespace를 사용하고 `.env*`는 ignored | `Needs Verification` | 실제 배포 값과 외부 설정이 적절한지 확인 필요 |
| Deployment configuration | 두 application이 실제 Production에서 동작 | build script만 있으며 hosting topology와 deployment manifest가 없음 | `Needs Verification` | Product 단계에서 topology는 deferred이며 현재 배포 상태도 불명 |

## Detailed Findings

## Public Experience

### Home이 Target의 콘텐츠 중심 Entry Point와 충돌

Target:
Home은 Minimal Author Identity를 유지하면서 Recent/Featured Posts와 Topics를 제공하는 콘텐츠 발견 Entry Point다.

Current:
현재 Home은 인사말, 개발자 소개, About/Activities 이동, technical/soft skill 목록으로 구성된다. Post 또는 Topic을 통한 콘텐츠 발견 영역은 없다.

Status:
`Needs Removal / Replacement`

Gap:
현재 자기소개 중심 정보 구조가 “Home의 중심은 콘텐츠”라는 확정된 Target과 일치하지 않는다.

Evidence:

- `apps/client/src/app/page.tsx`
- `docs/product/product-definition.md`의 `Public Experience`

### Blog와 Post의 기본 reading flow는 존재하지만 Target Quality Bar에는 미달

Target:
Reader가 post를 찾고 목록에서 상세로 이동해 기술 콘텐츠를 읽을 수 있어야 한다.

Current:
Published 목록, 검색, 상세 URL, Markdown rendering이 구현되어 있다. 상세는 loading skeleton과 error UI도 제공한다.

Status:
`Partial`

Gap:
검색 pagination, URL-based Pagination, syntax highlighting, 목록 상태 UI 및 mobile reading 검증이 부족하다.

Evidence:

- `apps/client/src/app/posts/page.tsx`
- `apps/client/src/app/posts/[id]/page.tsx`
- `apps/client/src/app/globals.css`
- `docs/reconnaissance/repository-reconnaissance.md`의 `Frontend Current State`

### About과 Activities는 Target의 기본 정보 범위를 제공

Target:
About은 Introduction/Career/Education/Contact를, Activities는 회사 밖의 Projects/Talks/Community/Learning을 보여준다.

Current:
About에 소개·경력·학력·연락처가 있고, Activities에는 project, presentation, study 및 관련 활동 콘텐츠가 있다.

Status:
`Satisfied`

Gap:
현재 확인된 content-scope gap은 없다. 실제 responsive usability는 Quality 영역의 별도 검증 대상이다.

Evidence:

- `apps/client/src/app/about/page.tsx`
- `apps/client/src/app/activities/page.tsx`
- `apps/client/src/mock/about.ts`
- `apps/client/src/mock/activity.ts`

## Content / Discovery

### Search는 구현되어 있으나 완전한 탐색 flow가 아님

Target:
Published content에 Search와 URL-based Pagination을 제공한다.

Current:
Title/content 검색과 range query가 있다. 검색 결과 page 변경은 query에 반영되지 않고, 표시 count도 일반 post count를 사용한다. Page state는 URL이 아닌 component state에만 있다.

Status:
`Partial`

Gap:
Search pagination이 완결되지 않았고 URL이 page/search navigation state를 표현하지 않는다.

Evidence:

- `apps/client/src/app/posts/page.tsx`
- `docs/reconnaissance/repository-reconnaissance.md`의 `현재 확인된 UI 미완성/의심 영역`

### Topics는 표시용 tags 수준으로만 존재

Target:
Topics가 content 의미를 표현하며 Home, Blog, Post와 Admin CMS에서 discovery와 management를 지원한다. Category hierarchy는 사용하지 않는다.

Current:
`Post`에는 optional `tags`가 있고 목록·상세에 표시된다. Admin은 comma-separated tags를 추가·제거할 수 있다. Topic route, filter, Home/Blog discovery, 별도 Topic contract는 없다. Post에는 category field가 없다.

Status:
`Partial`

Gap:
기존 `tags`와 Target Topics 사이의 product contract, public discovery, Admin management 범위가 충족되지 않는다.

Evidence:

- `packages/shared/types/post.ts`
- `apps/client/src/app/posts/page.tsx`
- `apps/client/src/app/posts/[id]/page.tsx`
- `apps/admin/src/components/PostManagement.tsx`

### Target `Post` model의 핵심 field 일부가 없음

Target:
`Post`는 Title, Summary/Description, Slug, Topics, Cover Image, Markdown Content, Status를 가진다.

Current:
현재 shared type은 title, content, author, timestamps, status, views, optional tags를 가진다. Summary/Description, Slug, Cover Image는 없다.

Status:
`Partial`

Gap:
Summary/Description, Slug, Cover Image가 confirmed missing이며 Topics는 tags로 부분 표현된다.

Evidence:

- `packages/shared/types/post.ts`
- `apps/admin/src/components/PostManagement.tsx`
- `docs/engineering/architecture.md`의 `Data 및 Persistence`

## Post Lifecycle

### 기본 상태와 editor preview는 구현됨

Target:
`Draft -> Preview -> Publish -> Published -> Edit / Update` flow를 제공한다.

Current:
Admin은 `draft`/`published`를 선택해 insert/update할 수 있고, Markdown editor 옆에 preview를 표시한다. Existing post를 불러와 수정할 수 있다.

Status:
`Needs Verification`

Gap:
Code-level control은 존재하지만 실제 Supabase Auth, RLS, persistence 환경에서 lifecycle 전체가 동작하는지는 검증되지 않았다.

Evidence:

- `apps/admin/src/components/PostManagement.tsx`
- `packages/admin-auth/src/AuthContext.tsx`

Uncertainty:

- 실제 author 계정과 write policy
- create/update 결과와 status 전환 동작

### Draft public isolation은 일부 query에만 표현됨

Target:
Draft는 public URL/API 직접 접근과 모든 discovery에서 차단되어야 한다.

Current:
목록과 검색은 `status = published` filter를 사용한다. 상세 query는 `id`만 사용하며 status filter가 없다. Repository에는 RLS policy가 없다.

Status:
`Partial`

Gap:
Frontend detail query는 Draft를 명시적으로 제외하지 않는다. 실제 API-level 차단 여부도 확인되지 않았다.

Evidence:

- `apps/client/src/app/posts/page.tsx`
- `apps/client/src/app/posts/[id]/page.tsx`
- `docs/engineering/architecture.md`의 `인증 및 권한`

Uncertainty:

- 외부 Supabase RLS가 direct URL/API access를 차단하는지 확인 필요

## Admin CMS

### CRUD, Save Draft, Publish, Preview implementation은 존재

Target:
Single author가 Post를 생성·수정·삭제하고 Draft 저장, Preview, Publish를 수행한다.

Current:
Admin UI와 Supabase select/insert/update/delete 호출, status selector, Markdown editor/preview가 존재한다.

Status:
`Needs Verification`

Gap:
실제 계정, database schema, RLS가 없어 end-to-end CMS behavior를 확인할 수 없다. CRUD 실패는 사용자 UI보다 console logging 중심이다.

Evidence:

- `apps/admin/src/components/PostManagement.tsx`
- `apps/admin/src/components/Login.tsx`
- `packages/admin-auth/src/AuthContext.tsx`
- `docs/reconnaissance/repository-reconnaissance.md`의 `Backend Current State`

Uncertainty:

- 인증 성공/실패 동작
- authenticated author의 read/write/delete permission

### Topic management는 tags 편집으로 부분 구현됨

Target:
Admin CMS가 Topic을 관리한다.

Current:
Editor에서 comma-separated tags를 추가하고 제거할 수 있다. Topic을 독립적으로 탐색·관리하는 model이나 UI는 없다.

Status:
`Partial`

Gap:
Target Topics의 의미와 lifecycle을 충족하는 관리 기능이 없다.

Evidence:

- `apps/admin/src/components/PostManagement.tsx`
- `packages/shared/types/post.ts`

## Discoverability

### Global metadata만 있고 post-level discoverability가 없음

Target:
Published content에 적절한 metadata, Canonical, Open Graph, Article/Author information, semantic structure를 제공한다.

Current:
Root layout에 generic title과 description만 있다. Post별 metadata, Canonical, Open Graph, Article/Author structured information은 없다. Post 상세는 `article`, `header`, `time`, heading을 사용한다.

Status:
`Partial`

Gap:
기본 global metadata와 일부 semantic HTML을 제외한 content-specific discoverability가 없다.

Evidence:

- `apps/client/src/app/layout.tsx`
- `apps/client/src/app/posts/[id]/page.tsx`
- Targeted search에서 `generateMetadata`, canonical, Open Graph, structured data implementation이 발견되지 않음

### Sitemap과 Draft discovery exclusion이 완성되지 않음

Target:
Published post는 Sitemap 등 discovery 대상이며 Draft는 제외한다.

Current:
Sitemap implementation은 없다. 목록과 search query는 Draft를 제외하지만 detail query는 제외하지 않는다.

Status:
`Partial`

Gap:
Sitemap이 missing이고, 모든 public discovery/access boundary에서 일관된 Draft exclusion이 확인되지 않는다.

Evidence:

- `apps/client/src/app/posts/page.tsx`
- `apps/client/src/app/posts/[id]/page.tsx`
- Repository에 sitemap file/route가 없음

### 실제 crawl/index 가능성은 runtime 검증이 필요

Target:
Published content가 검색엔진과 AI 기반 탐색 환경에서 crawl/index될 수 있어야 한다.

Current:
Post data는 browser-side Supabase query로 loading된다. 실제 Production output이나 crawler behavior는 검증되지 않았다.

Status:
`Needs Verification`

Gap:
Code만으로 crawl/index 결과를 확정할 수 없다.

Evidence:

- `apps/client/src/app/posts/page.tsx`
- `apps/client/src/app/posts/[id]/page.tsx`
- `docs/engineering/architecture.md`의 `Frontend Architecture`

Uncertainty:

- Production HTML에 content가 포함되는지
- 검색엔진과 AI crawler가 content를 발견·index하는지

## Analytics

### 외부 Analytics integration이 없음

Target:
자체 Analytics 제품을 만들지 않고 외부 service로 Traffic, Acquisition, Content Consumption을 파악한다.

Current:
Analytics package, initialization, tracking code가 없다.

Status:
`Missing`

Gap:
운영에 필요한 외부 Analytics integration이 없다.

Evidence:

- Root 및 app package manifest
- `docs/reconnaissance/repository-reconnaissance.md`의 `Frontend Current State`

### Mock Analytics Dashboard가 Target scope와 충돌

Target:
자체 Analytics Dashboard는 핵심 범위에서 제외한다.

Current:
Admin navigation에 Analytics tab이 있고 mock/static/random visitor, page view, popular page 데이터를 표시한다.

Status:
`Needs Removal / Replacement`

Gap:
현재 자체 mock dashboard는 confirmed Non-goal과 직접 충돌한다.

Evidence:

- `apps/admin/src/App.tsx`
- `apps/admin/src/components/Analytics.tsx`
- `docs/product/product-definition.md`의 `Analytics`, `Non-goals / Scope Boundary`

## Quality

### Loading, Empty, Error state가 flow별로 일관되지 않음

Target:
Public Blog 핵심 flow에 Loading, Empty, Error state를 제공한다.

Current:
Post detail에는 loading skeleton과 error UI가 있다. Post list는 loading/error 시 null을 반환한다. Empty state는 있으나 일반 목록 0건에도 검색 전용 문구를 사용한다. Admin CRUD 오류는 주로 console에 남긴다.

Status:
`Partial`

Gap:
목록 및 Admin flow의 사용자-facing 상태가 Target Quality Bar를 충족하지 않는다.

Evidence:

- `apps/client/src/app/posts/page.tsx`
- `apps/client/src/app/posts/[id]/page.tsx`
- `apps/admin/src/components/PostManagement.tsx`

### Markdown reading experience는 기본 지원만 존재

Target:
Heading, code block, syntax highlighting, inline code, link, image, list, table, blockquote, 긴 글과 mobile readability를 지원한다.

Current:
`react-markdown`, `remark-gfm`, typography style 및 code block style이 있다. Syntax highlighting dependency/configuration은 없다. 긴 글과 mobile readability는 실행 검증되지 않았다.

Status:
`Partial`

Gap:
Syntax highlighting이 missing이며 실제 content fixture를 통한 긴 글/mobile reading 품질이 확인되지 않았다.

Evidence:

- `apps/client/src/app/posts/[id]/page.tsx`
- `apps/client/src/app/globals.css`
- `apps/client/package.json`

### Responsive와 Accessibility는 일부 code만으로 완료를 판단할 수 없음

Target:
Public 핵심 flow는 Desktop/Mobile에서 정상 동작하고 기본 Accessibility를 제공한다. Admin은 Desktop 중심이되 기본 Responsive 품질을 유지한다.

Current:
Tailwind breakpoint와 일부 semantic markup이 있다. Reconnaissance에서 mobile pagination 미연결과 overflow 가능성이 확인되었다. Accessibility audit이나 manual device test는 없다.

Status:
`Partial`

Gap:
Mobile pagination에 confirmed interaction gap이 있고, 나머지 전체 device와 Accessibility 품질은 실행 검증이 필요하다.

Evidence:

- `apps/client/src/app/posts/page.tsx`
- `apps/client/src/app/activities/page.tsx`
- `apps/client/src/components/Header.tsx`
- `docs/reconnaissance/repository-reconnaissance.md`의 `Responsive`, `Verification`

Uncertainty:

- 주요 viewport별 layout과 interaction
- keyboard navigation, focus, screen reader, contrast 등 기본 Accessibility

### Performance와 SEO를 측정할 verification capability가 없음

Target:
Production에서 Performance와 SEO 품질을 측정하고 검증할 수 있어야 한다.

Current:
Lighthouse 또는 이에 준하는 configuration/script/test가 없다.

Status:
`Missing`

Gap:
Performance/SEO 품질을 반복 측정하는 현재 verification path가 없다.

Evidence:

- `package.json`
- `apps/client/package.json`
- `docs/reconnaissance/repository-reconnaissance.md`의 `Verification`

## Production & Security

### Public Blog와 Admin의 Production availability는 미확인

Target:
두 application 모두 실제 Production 환경에서 사용할 수 있어야 한다.

Current:
각 app에 build script는 있다. Build는 reconnaissance에서 실행되지 않았고 실제 deployed URL, hosting topology, production environment configuration은 확인되지 않았다. Admin에는 별도 production server script가 없고 SPA rewrite configuration도 확인되지 않는다.

Reconnaissance에 배포 실패 가능성에 대한 가설은 있으나, 확인된 Production 배포 실패는 없다.

Status:
`Needs Verification`

Gap:
현재 증거로 Production 사용 가능 여부를 확정할 수 없다.

Evidence:

- `package.json`
- `apps/client/package.json`
- `apps/admin/package.json`
- `docs/reconnaissance/repository-reconnaissance.md`의 `Deployment`

Uncertainty:

- client/admin build 결과
- 실제 hosting 및 environment configuration
- Admin `/login` direct navigation

### Authentication implementation은 있지만 실제 author flow가 미검증

Target:
Anonymous visitor는 Admin에 접근할 수 없고 Authenticated Author만 CMS를 사용한다.

Current:
Supabase Auth context, `/login`, `ProtectedRoute`, login/logout 호출이 있다. `signInWithPassword()` 반환 error를 직접 검사하지 않아 실패 UX가 불완전할 가능성이 있다.

Status:
`Needs Verification`

Gap:
실제 author 계정, 성공·실패 session flow와 Production Auth 설정이 확인되지 않았다.

Evidence:

- `packages/admin-auth/src/AuthContext.tsx`
- `apps/admin/src/components/Login.tsx`
- `apps/admin/src/components/ProtectedRoute.tsx`

### Data/API Authorization과 Draft protection은 Repository에서 확정할 수 없음

Target:
UI visibility가 아니라 실제 data/API boundary에서 Authorization을 적용하고 Draft 직접 접근을 차단한다.

Current:
Repository에는 RLS, policy, migration, RPC definition이 없다. Public detail query는 status를 제한하지 않는다.

Status:
`Needs Verification`

Gap:
외부 Supabase가 anonymous read와 authenticated mutation을 Target대로 제한하는지 확인할 근거가 없다.

Evidence:

- `docs/engineering/architecture.md`의 `인증 및 권한`, `Known Unknowns`
- `apps/client/src/app/posts/[id]/page.tsx`
- `apps/admin/src/components/PostManagement.tsx`

Uncertainty:

- RLS 활성화 및 policy
- anonymous direct API access
- authenticated author의 mutation permission

### Secret exposure 여부는 외부 환경까지 검증되지 않음

Target:
Secret/Credential을 client 또는 public Repository에 노출하지 않는다.

Current:
Code는 `NEXT_PUBLIC_*`와 `VITE_*` browser environment namespace를 사용하고 `.env*`는 ignored다. 실제 environment 값과 deployment 설정은 확인 대상에서 제외되어 있다.

Status:
`Needs Verification`

Gap:
실제 설정된 값이 browser 공개용 key인지, 비공개 credential이 배포나 history에 노출되지 않았는지는 별도 보안 검증이 필요하다.

Evidence:

- `apps/client/src/supabase.ts`
- `apps/admin/src/supabase.ts`
- `.gitignore`
- `docs/reconnaissance/repository-reconnaissance.md`의 `Environment & Configuration`

## Scope Conflicts

### 자기소개 중심 Home

Target:
Home은 콘텐츠 중심이며 작성자 정보는 최소한으로 제공한다.

Current:
Home의 대부분이 작성자 소개와 skill 목록이다.

Status:
`Needs Removal / Replacement`

Gap:
현재 Home의 정보 우선순위가 확정된 Target과 반대다.

Evidence:

- `apps/client/src/app/page.tsx`
- `docs/product/product-definition.md`의 `Home`

### Mock Analytics Dashboard

Target:
자체 Analytics 시스템과 Analytics Dashboard는 Non-goal이다.

Current:
Admin에 mock Analytics view와 navigation이 구현되어 있다.

Status:
`Needs Removal / Replacement`

Gap:
현재 기능이 명시적인 Non-goal과 충돌한다.

Evidence:

- `apps/admin/src/App.tsx`
- `apps/admin/src/components/Analytics.tsx`
- `docs/product/product-definition.md`의 `Analytics`, `Non-goals / Scope Boundary`

## Needs Verification

다음 항목은 현재 Repository evidence만으로 충족 여부를 확정할 수 없다.

| Item | What must be verified later |
|---|---|
| Public Supabase reads | 실제 Production/검증 환경에서 published 목록·검색·상세가 정상 조회되는지 |
| `increment_post_views` | RPC 존재, execute permission, 증가 결과, transaction/concurrency 동작 |
| Admin login | 실제 author 계정의 성공·실패·새로고침·logout session flow |
| Admin CRUD/lifecycle | Draft 생성, 조회, preview, publish, update, delete가 실제 DB와 일치하는지 |
| Authorization | Anonymous와 authenticated author에 적용되는 Supabase RLS 및 read/write policy |
| Draft isolation | URL 및 direct API로 Draft에 접근할 수 없고 모든 discovery에서 제외되는지 |
| Crawl / Index | Production HTML과 실제 crawler에서 published content가 발견·index되는지 |
| Public Responsive | 주요 Desktop/Mobile viewport에서 navigation, search, pagination, post reading이 정상인지 |
| Admin Responsive | Desktop 중심 flow와 기본 mobile/tablet layout이 정상인지 |
| Accessibility | Keyboard, focus, label, semantic structure, screen reader, contrast의 기본 품질 |
| Markdown rendering | Target의 각 Markdown 요소와 긴 글/mobile fixture가 올바르게 표시되는지 |
| Public build/deployment | Client build, runtime environment, deployed URL, Performance/SEO 측정 가능 여부 |
| Admin build/deployment | Admin build, static hosting, SPA fallback, `/login` direct navigation |
| Secret protection | 배포 환경과 history에 server secret 또는 credential이 노출되지 않았는지(값을 문서화하지 않음) |

## Confirmed Scope Conflicts

확인된 Scope Conflict는 두 가지다.

1. 현재 Home은 자기소개와 skill 중심이어서 콘텐츠 중심 Home이라는 Target과 충돌한다.
2. 현재 Admin의 Mock Analytics Dashboard는 자체 Analytics Dashboard를 만들지 않는다는 Non-goal과 충돌한다.

Activities의 `category`는 활동 콘텐츠를 분류하는 field이며 `Post`의 Category hierarchy가 아니므로 Scope Conflict로 분류하지 않는다. 현재 code에서 Multi-author UI, Public signup, Comment/Like/Follow, Rich Text Editor, Scheduled Publish, Private Post, Archived lifecycle, Related Post system, Staging 의무화 등 다른 confirmed Non-goal과 충돌하는 구현은 확인되지 않았다.

## Inputs for Requirements

다음 confirmed gap은 다음 Requirements / Acceptance Criteria 단계의 입력이다. 여기서는 요구사항 문장이나 Acceptance Criteria로 구체화하지 않는다.

- Home을 콘텐츠 발견 중심으로 정렬하고 Recent/Featured Posts와 Topics를 다루는 범위
- `Post`의 Summary/Description, Slug, Cover Image 및 Topics model gap
- Public Topics discovery와 Admin Topic management gap
- Search pagination 및 URL-based Pagination gap
- 모든 public access/discovery boundary에서의 Draft isolation gap
- Post별 metadata, Canonical, Open Graph, Sitemap, Article/Author information gap
- 외부 Analytics integration 부재와 Mock Analytics Dashboard scope conflict
- 목록 및 Admin flow의 Loading, Empty, Error state gap
- Markdown syntax highlighting과 Technical Content Reading Experience gap
- Public mobile pagination을 포함한 confirmed responsive interaction gap
- Performance/SEO verification capability 부재

Supabase Authorization, 실제 Production availability, Accessibility, 전체 Responsive 품질처럼 runtime 또는 외부 evidence가 필요한 항목은 confirmed implementation gap으로 확정하지 않는다. 먼저 `Needs Verification` 항목의 증거가 필요하다.
