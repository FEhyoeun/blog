# AGENTS.md

## 프로젝트 개요 (Project)

이 Repository는 개인 블로그를 위한 npm workspaces/Turborepo monorepo다. `apps/client`는 공개 Next.js application이고, `apps/admin`은 React/Vite 기반 관리자 SPA다. 두 application 모두 브라우저에서 Supabase에 직접 접근하며, Repository 내부에 별도 backend service는 없다.

## Repository Map

- `apps/client/`: 공개 Next.js App Router application.
- `apps/admin/`: React/Vite 관리자 application.
- `packages/shared/`: 공통 Supabase client factory, type, utility.
- `packages/admin-auth/`: admin application에서 사용하는 Supabase authentication context.
- `docs/README.md`: Knowledge Base index와 책임 범위, Context 탐색 규칙.
- `docs/engineering/architecture.md`: 현재 system architecture와 주요 runtime/data boundary.
- `docs/reconnaissance/repository-reconnaissance.md`: 특정 시점의 임시 조사 기록. 사용하기 전에 내용을 검증한다.
- `package.json`, `turbo.json`: workspace script와 task orchestration.
- 각 application의 `package.json` 및 TypeScript, Next.js, Vite, Tailwind, PostCSS 파일: application별 configuration.

계획된 architecture, API, database, deployment, task documentation이 이미 존재한다고 가정하지 않는다. 해당 정보를 신뢰하기 전에 Repository에서 실제 위치를 확인한다.

## Source of Truth

현재 Repository의 정보는 다음 순서로 판단한다.

1. 실행 가능한 code, package script, lockfile, configuration.
2. `docs/README.md`를 통해 찾은 현재의 관련 장기 documentation.
3. Conversation context와 과거 기록.

정보가 충돌하면 현재 implementation과 configuration을 확인한다. Reconnaissance report는 조사 artifact이며, 장기적인 권위 자료나 직접 확인을 대체하는 자료가 아니다. Repository에서 확인한 사실과 추론을 구분하고, 누락된 정보를 만들어내지 말고 결과에 영향을 주는 불확실성을 보고한다.

## 작업 원칙 (Working Principles)

- 구현 전에 요청이 기존 작업의 연속인지 새로운 task인지 판단한다.
- 관련 implementation, configuration, documentation과 실제로 존재하는 task 전용 workspace 또는 기록을 확인한다.
- 새로운 기능이나 abstraction을 추가하기 전에 기존 구현과 Repository의 coding pattern을 찾는다.
- 요청에서 변경을 요구하지 않는 한 기존 pattern을 따른다.
- 변경은 요청 범위에 집중하고, 범위 밖의 기존 동작을 보존한다.
- task와 관련된 명확한 이유 없이 광범위한 refactoring이나 부수적인 정리를 수행하지 않는다.
- 가정, 의심되는 외부 상태, 문서화되지 않은 Supabase 동작을 확인된 사실로 표현하지 않는다.

## Context Rules

task에 필요한 Context만 다음 순서로 확인한다.

1. 이 파일.
2. `docs/README.md`, 이후 task와 관련된 장기 documentation만 확인.
3. 영향을 받는 app/package manifest와 framework configuration.
4. 관련 implementation과 인접한 caller, consumer, shared type, 그리고 존재하는 경우 test.

`docs/reconnaissance/repository-reconnaissance.md`는 알려진 영역과 Unknown을 찾기 위한 임시 baseline으로만 사용하고, 관련 내용은 다시 검증한다. Conversation context만으로 Source of Truth를 판단하지 않는다. Supabase 관련 작업에서는 client 호출과 shared type을 확인하되, schema, RLS policy, migration, RPC definition은 현재 Repository에 저장되어 있지 않음을 유의한다. 외부 동작은 명시적인 확인이 필요할 수 있다.

## 변경 규칙 (Change Rules)

- 수정 전에 영향을 받는 파일을 읽고 caller와 data flow를 추적한다.
- Next.js client, Vite admin application, shared source의 역할 구분을 지킨다.
- 기존 cross-workspace alias와 dependency를 고려한다. `packages/*`에는 현재 package manifest가 없으므로 독립적으로 package화되어 있다고 가정하지 않는다.
- 요청된 변경이 contract를 바꾸는 경우 shared contract와 영향을 받는 모든 consumer를 함께 수정한다.
- `node_modules`, `.next`, `dist`, `.turbo`처럼 생성되거나 무시되는 artifact를 직접 수정하지 않는다.
- task에 필요하지 않은 파일, dependency version, lockfile, configuration을 변경하지 않는다.
- Repository에 test가 없다는 이유만으로 새로운 verification tooling을 설치하지 않는다.

## Security & Sensitive Information

commit되는 파일과 Agent가 작성한 documentation은 공개된다고 가정한다.

- API key, token, password, cookie, session, connection string, credential, 개인 연락처, 비공개 service data를 code, docs, task 기록, log, 응답에 복사하지 않는다.
- `.env*` 파일의 값을 출력하거나 문서화하지 않는다. Environment variable의 이름과 용도만 언급하며, 민감한 출력을 발견하면 redaction한다.
- Client의 `NEXT_PUBLIC_*`와 admin의 `VITE_*` 변수는 브라우저에 노출된다. Supabase service-role key 또는 다른 server secret을 절대 넣지 않는다.
- UI route 보호는 authorization이 아니다. 검증된 RLS/policy 근거 없이 Supabase 접근이 안전하다고 판단하지 않는다.
- 노출이 의심되면 실제 값은 제외하고 위치와 종류만 보고한다.

## Verification

현재 Repository가 지원하는 다음 verification만 사용한다.

```bash
npm run lint
npm run type-check
npm run build
npm run lint -w client
npm run lint -w admin
npm run type-check -w admin
npm run build -w client
npm run build -w admin
```

변경 범위에 비례해 검증 항목을 선택하고, 완료 전에 적용 가능한 검증을 실행한다. Build는 `.next`/`dist` output을 생성하므로 명시적인 read-only task에서는 실행하지 않는다.

현재 baseline의 주의사항:

- Admin lint와 type-check는 reconnaissance baseline에서 실패했다. 비교 없이 기존 실패를 현재 변경으로 인한 문제로 판단하지 않으며, 통과했다고 보고하지 않는다.
- Client에는 lint script가 있지만 `type-check` script는 없다. 따라서 root의 `npm run type-check`는 client를 typecheck하지 않는다.
- 현재 unit, integration, end-to-end test script는 없다.

실행한 모든 검증과 결과, 생략한 검증, 기존 실패를 보고한다. 적용 가능한 검증이 실패했다면 verification에 성공했다고 표현하지 않는다.

## Definition of Done

다음 조건을 모두 충족해야 task가 완료된 것으로 판단한다.

- 요청된 동작과 명시된 Acceptance Criteria를 충족한다.
- 변경이 의도한 범위로 제한되고 관련 없는 기존 동작을 보존한다.
- 적용 가능한 verification을 실행하고 결과를 정확하게 보고한다.
- task가 장기적인 Repository 지식이나 운영 지침을 변경했다면 관련 documentation을 갱신한다.
- 남아 있는 limitation, 검증되지 않은 외부 dependency, 결과에 영향을 주는 불확실성을 공개한다.
- 민감정보나 관련 없는 생성 파일의 변경을 포함하지 않는다.

## Documentation

- 이 파일은 간결하게 유지하며, Repository 전체의 운영 규칙과 Context routing만 다룬다.
- `docs/README.md`를 따른다. 유지할 준비가 된 검증된 장기 지식은 `docs/product/`, `docs/design/`, `docs/engineering/`, `docs/decisions/`에 기록한다.
- task 전용 plan, 조사 기록, 임시 Context는 이 파일에 넣지 않는다. 기존 task workspace가 있을 때만 그곳에 저장한다.
- 빈 placeholder를 만들거나 계획된 문서를 현재 Source of Truth처럼 참조하지 않는다. 전용 문서가 생기기 전에는 현재 implementation과 configuration을 사용하며, reconnaissance는 보조 근거로만 사용한다.
- 전체 API 목록, database schema, component inventory, product requirements, UI specification, troubleshooting history를 이 파일에 중복해서 기록하지 않는다.
