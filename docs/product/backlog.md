# V1 Product Backlog

> 이 문서는 V1 Product 목표를 달성하기 위해 앞으로 확인하거나 해결해야 할 Product-level 작업을 추적하는 Source of Truth다. V1 완료 조건은 `docs/product/requirements.md`, 현재 상태와 Target의 차이는 `docs/product/gap-analysis.md`를 따른다.

## Backlog 사용 원칙

- Backlog는 V1 목표 달성을 위해 남은 Product-level 작업을 추적한다.
- Requirement와 Backlog는 1:1 관계가 아니다. 하나의 Backlog가 여러 Requirement에 기여하거나 하나의 Requirement가 여러 Backlog로 나뉠 수 있다.
- Verification 결과 실제 Gap이 확인되면 별도의 Implementation Task가 파생될 수 있다. 확인 전에는 결함이나 구현 필요성을 단정하지 않는다.
- 현재 Repository와 확인된 Current Evidence를 추측보다 우선한다.
- 상세 Design과 Engineering Solution은 이후 단계에서 결정한다.
- Priority와 전체 실행 순서는 이 문서에서 결정하지 않는다. 확인된 dependency만 각 항목에 기록한다.
- 이 Backlog는 프로젝트 진행과 검증 결과에 따라 업데이트되는 살아 있는 문서다.

## Product Decision Baseline

이 Backlog에는 다음 최신 Product Decision을 적용한다.

- 새 Post의 Slug는 Title을 기반으로 자동 생성하며 한글을 포함한 Unicode를 허용한다.
- 고유 Slug는 최초 Publish 시 확정한다. 이후 Title 수정만으로 기존 Published Slug를 변경하지 않는다.
- 동일한 Slug가 이미 존재하면 시스템이 고유한 Slug를 생성한다.
- V1에서는 작성자의 수동 Slug 관리와 Redirect 관리를 제공하지 않는다.
- Publish에는 비어 있지 않은 Title, Summary, Content와 유효한 고유 Slug가 필요하다. 임의의 최소 글자 수는 두지 않으며 Topics와 직접 지정하는 Cover Image는 선택 사항이다.
- Table of Contents는 Published Post의 Heading 구조를 기반으로 자동 생성한다. 구성할 Heading이 없으면 표시하지 않으며 글자 수 기준은 두지 않는다.
- Production에서 실제 Performance를 측정하고 검증할 수 있어야 한다. V1 Product 단계에서는 임의의 정량 Quality Gate를 두지 않는다.

## Backlog Items

## BC-01 Content-centered Home

**Type:** Removal / Replacement

**Related Requirements:** REQ-01, REQ-15, REQ-16, REQ-19

**Current Evidence:** 현재 Home은 작성자 소개와 Skills 중심이며 최근 Published Post로 진입하는 영역이 없다. 근거는 `apps/client/src/app/page.tsx`와 `docs/product/gap-analysis.md`다.

**Target Outcome:** 방문자가 최소한의 작성자 정보를 이해하고 Published Date 최신순의 최근 기술 콘텐츠로 진입할 수 있는 콘텐츠 중심 Home을 제공한다.

**Why Needed:** 현재 Home의 정보 우선순위가 V1의 콘텐츠 중심 방향과 충돌한다.

**Dependencies / Notes:** Public content runtime 검증인 BC-18과 Slug 기반 URL인 BC-04를 함께 고려한다. Featured Posts와 Home Topics는 Initial V1 범위에 포함하지 않는다.

## BC-02 URL-based Blog Discovery

**Type:** Enhancement

**Related Requirements:** REQ-02, REQ-15, REQ-16, REQ-19

**Current Evidence:** Published Post 목록과 Title/Content 검색, component state 기반 pagination이 있다. 검색 pagination과 count가 불완전하고 일부 이동 control이 연결되지 않았으며 Search, Topic, Pagination 상태가 URL에 표현되지 않는다. 근거는 `apps/client/src/app/posts/page.tsx`다.

**Target Outcome:** Title, Summary, Topics 검색과 Topic filter, Pagination 상태가 URL에 반영되고 직접 접근하거나 새로고침해도 같은 탐색 상태가 복원되는 Blog 경험을 제공한다.

**Why Needed:** 기존 목록과 검색은 V1 탐색 대상과 URL 기반 상태를 완전하게 제공하지 못한다.

**Dependencies / Notes:** Summary와 Topics의 Product contract를 다루는 BC-03, BC-05와 관련된다. Content Full-text Search는 V1 범위가 아니다.

## BC-03 Post Summary and Publication Information

**Type:** Enhancement

**Related Requirements:** REQ-03, REQ-04, REQ-07

**Current Evidence:** 현재 `Post` type에는 Title, Content, `created_at`, optional `updated_at` 등이 있지만 독립적인 Summary가 없다. 최초 Published Date와 Updated Date의 lifecycle 의미도 현재 contract에서 확인되지 않는다. 근거는 `packages/shared/types/post.ts`다.

**Target Outcome:** 작성자가 Summary를 관리하고 Public Post에서 Summary, 최초 Published Date, 필요한 Updated Date를 일관되게 확인할 수 있다.

**Why Needed:** V1 Post 정보와 Publish 필수 입력을 현재 model과 화면이 모두 표현하지 못한다.

**Dependencies / Notes:** 실제 database timestamp 구조와 lifecycle contract는 Repository에 없으므로 이후 Engineering investigation이 필요하다. Summary는 BC-13의 Published Post metadata에 필요하다.

## BC-04 Slug-based Published Post Identity

**Type:** New Capability

**Related Requirements:** REQ-03, REQ-07, REQ-13, REQ-19

**Current Evidence:** 현재 Post에는 Slug가 없고 Public 상세 URL은 numeric `id` 기반 `/posts/[id]`다.

**Target Outcome:** 새 Post는 Title 기반의 Unicode Slug를 자동으로 생성한다. 유효한 고유 Slug는 최초 Publish 시 확정되며, 이후 Title 수정만으로 변경되지 않는다. 동일한 Slug가 이미 존재하면 시스템이 고유한 Slug를 생성한다.

**Why Needed:** V1은 콘텐츠를 식별하는 안정적이고 고유한 Public URL과 Canonical 기반을 요구하지만 현재 Slug capability가 없다.

**Dependencies / Notes:** V1에서는 작성자의 수동 Slug 관리와 Redirect 관리를 제공하지 않는다. 구체적인 Slug algorithm과 persistence 방식은 Engineering 단계에서 결정한다. BC-13과 BC-14의 입력이 된다.

## BC-05 Topics Discovery and Management

**Type:** Enhancement

**Related Requirements:** REQ-02, REQ-04, REQ-07, REQ-11, REQ-13, REQ-19

**Current Evidence:** `tags?: string[]` 표시와 comma-separated 편집은 존재하지만 Public Topic filter, Topic 검색·선택, 독립적인 목록·이름 변경·삭제, 사용 중인 Topic의 영향 확인은 없다.

**Target Outcome:** Post는 선택적으로 0개 이상의 Topic을 가지며 Public 탐색과 Admin 관리에서 동일한 Topic 개념을 사용한다. 사용 중인 Topic 삭제 시 영향받는 Post 수와 연결 해제를 명확히 알리고 Post 자체는 보존한다.

**Why Needed:** 현재 tags 편집만으로는 V1의 Topics discovery와 management outcome을 충족하지 못한다.

**Dependencies / Notes:** 기존 `tags`와 Target Topics의 관계 및 persistence contract는 Design/Engineering 단계에서 확인한다. Topic은 Publish 필수 조건이 아니다.

## BC-06 Representative Image Resolution

**Type:** New Capability

**Related Requirements:** REQ-03, REQ-06, REQ-07

**Current Evidence:** 현재 shared Post type, Admin editor, Public Post에 Cover Image field나 대표 이미지 우선순위가 없다.

**Target Outcome:** Cover Image, 본문의 첫 번째 이미지, 시스템 Default Image 순서로 모든 Published Post의 대표 이미지를 일관되게 결정한다.

**Why Needed:** Public 표시와 검색·링크 공유 정보에 사용할 대표 이미지가 현재 보장되지 않는다.

**Dependencies / Notes:** 직접 지정하는 Cover Image는 Publish 필수 조건이 아니다. 이미지 입력·저장 방식은 이후 Design/Engineering 단계에서 결정한다. 결과는 BC-13에서 사용한다.

## BC-07 Explicit Authoring and Post Lifecycle

**Type:** Enhancement

**Related Requirements:** REQ-07, REQ-09, REQ-15

**Current Evidence:** Admin에는 Draft/Published status selector와 insert/update/delete 동작, 삭제 확인이 있다. Title, Content, Status에 대한 명시적 runtime validation은 없으며 Save Draft, Publish, Save Changes, Unpublish가 독립된 Product action으로 정립되어 있지 않다.

**Target Outcome:** Title, Summary, Content가 비어 있지 않고 유효한 고유 Slug를 생성할 수 있을 때만 Publish한다. 작성자는 Save Draft, Save Draft 없는 직접 Publish, Save Changes, Unpublish, 확인을 거친 영구 Delete를 명확히 구분해 수행할 수 있다.

**Why Needed:** 현재 status 선택 기반 저장만으로는 V1 Publish Validation과 lifecycle 및 성공·실패 결과를 명확히 보장하지 못한다.

**Dependencies / Notes:** Topics와 직접 지정하는 Cover Image는 Publish 필수 조건이 아니며 임의의 최소 글자 수를 두지 않는다. 실제 lifecycle persistence는 BC-20과 BC-21의 Verification 결과를 바탕으로 보완 범위를 결정한다. Autosave, Trash, Archived는 V1 범위가 아니다.

## BC-08 Full Preview Experience

**Type:** New Capability

**Related Requirements:** REQ-08, REQ-12

**Current Evidence:** Admin Editor 내부에 현재 Content를 표시하는 Preview가 있지만 Published Post의 전체 읽기 경험에 대응하는 별도 Full Preview는 확인되지 않는다.

**Target Outcome:** 인증된 작성자가 저장이나 상태 변경 없이 Live Preview와 실제 Published Post에 가까운 Full Preview를 사용할 수 있다.

**Why Needed:** 현재 inline Preview만으로는 V1에서 구분한 Full Preview outcome을 충족하지 못한다.

**Dependencies / Notes:** Public Markdown 표현과 읽기 구조를 다루는 BC-10, BC-11, BC-22와 관련된다. External Shareable Draft Preview는 V1 범위가 아니다.

## BC-09 Admin Post Discovery Controls

**Type:** Enhancement

**Related Requirements:** REQ-10, REQ-15, REQ-19

**Current Evidence:** Admin은 전체 Post를 조회하고 목록을 표시하지만 All/Draft/Published filter와 Title 검색은 확인되지 않는다.

**Target Outcome:** 작성자가 전체 Post를 상태와 Title로 찾고 선택한 Post의 편집 흐름으로 진입할 수 있다.

**Why Needed:** Post가 축적되면 현재 전체 목록만으로는 V1 관리 탐색 기준을 충족하지 못한다.

**Dependencies / Notes:** 실제 목록 조회와 상태 표시의 runtime 동작은 BC-20에서 검증한다.

## BC-10 Code Syntax Highlighting

**Type:** New Capability

**Related Requirements:** REQ-05, REQ-08, REQ-16

**Current Evidence:** `react-markdown`, `remark-gfm`과 기본 code style은 있지만 Syntax Highlighting dependency나 configuration은 확인되지 않는다.

**Target Outcome:** 언어 정보가 있는 Code Block을 해당 언어에 맞게 구분해 읽을 수 있다.

**Why Needed:** 기술 콘텐츠 읽기 경험의 명시적인 V1 기준이 현재 빠져 있다.

**Dependencies / Notes:** 구체적인 library와 rendering 방식은 Engineering 단계에서 결정한다. Public Post와 Full Preview에서 일관된 결과가 필요하다.

## BC-11 Long-form Table of Contents

**Type:** New Capability

**Related Requirements:** REQ-05, REQ-08, REQ-16

**Current Evidence:** 현재 Public Post와 Admin Preview에서 Heading 기반 Table of Contents 동작이 확인되지 않는다.

**Target Outcome:** Published Post의 Heading 구조를 기반으로 Table of Contents를 자동 생성하고 각 항목에서 해당 본문 구간으로 이동할 수 있다. 구성할 Heading이 없으면 Table of Contents를 표시하지 않는다.

**Why Needed:** Heading을 가진 기술 콘텐츠를 구조적으로 탐색하는 V1 읽기 outcome을 현재 제공하지 않는다.

**Dependencies / Notes:** 적용 여부를 글자 수나 별도의 “긴 콘텐츠” 기준으로 판단하지 않는다. Heading 추출과 이동의 구체적인 구현은 이후 Engineering 단계에서 결정한다.

## BC-12 User-facing Loading, Empty, Error and Mutation Feedback

**Type:** Enhancement

**Related Requirements:** REQ-02, REQ-07, REQ-09, REQ-10, REQ-11, REQ-15, REQ-17

**Current Evidence:** Post detail에는 Loading/Error UI가 있지만 목록은 Loading/Error 시 빈 화면을 반환한다. 일반 0건에도 검색 전용 Empty 문구가 표시되며 Admin mutation 실패는 주로 console에 기록된다.

**Target Outcome:** Public과 Admin 핵심 흐름에서 Loading, Empty, Error 및 mutation 성공·실패를 서로 구분해 인지할 수 있다.

**Why Needed:** 현재 일부 실패가 빈 화면이나 정상 상태처럼 보일 수 있어 V1 완료 판정이 어렵다.

**Dependencies / Notes:** BC-18, BC-19, BC-20의 runtime Verification에서 확인되는 실패 경로를 함께 반영한다.

## BC-13 Published Post Metadata and Share Identity

**Type:** New Capability

**Related Requirements:** REQ-03, REQ-04, REQ-13

**Current Evidence:** Root에 generic title/description만 있고 Post별 Title, Summary, 대표 이미지, Canonical, Open Graph, Article/Author information은 확인되지 않는다.

**Target Outcome:** 각 Published Post가 검색 및 링크 공유 환경에서 자신의 Title, Summary, 대표 이미지와 고유 URL을 정확히 식별한다.

**Why Needed:** 현재 global metadata만으로는 개별 Post discoverability requirement를 충족하지 못한다.

**Dependencies / Notes:** BC-03의 Summary, BC-04의 Slug URL, BC-06의 대표 이미지가 필요하다. 구체적인 metadata 기술과 library는 Engineering 단계에서 결정한다.

## BC-14 Published-content Sitemap and Discovery Boundary

**Type:** New Capability

**Related Requirements:** REQ-13, REQ-19

**Current Evidence:** Sitemap 구현이 없으며 목록과 검색만 Published filter를 사용한다. 상세 조회는 status를 제한하지 않는다.

**Target Outcome:** Published 콘텐츠만 Sitemap과 공개 discovery에 포함되고 Draft, Unpublish 콘텐츠, Admin, Admin Preview와 인증 영역은 제외된다.

**Why Needed:** 현재 discovery surface 전체에 일관된 Public/Private 경계가 없다.

**Dependencies / Notes:** BC-04의 Published Post URL과 BC-21의 Public/Private authorization Verification이 범위를 결정한다.

## BC-15 External Analytics Visibility

**Type:** New Capability

**Related Requirements:** REQ-14, REQ-19

**Current Evidence:** 실제 외부 Analytics integration이나 관련 initialization/tracking 근거가 없다.

**Target Outcome:** 작성자가 외부 도구에서 전체 방문, 주요 유입 경로, Published Post별 조회 현황과 도구가 제공하는 검색 유입 또는 검색 성과를 확인할 수 있다.

**Why Needed:** 운영에 필요한 Analytics outcome이 현재 존재하지 않는다.

**Dependencies / Notes:** Analytics provider와 integration 방식은 이후 단계에서 결정한다. 최종 검증에는 BC-26의 실제 Production 환경이 필요하다. 자체 Analytics Dashboard는 V1 범위가 아니다.

## BC-16 Remove Mock Analytics Dashboard

**Type:** Removal / Replacement

**Related Requirements:** REQ-14

**Current Evidence:** Admin에 mock/static/random 데이터를 표시하는 Analytics tab과 component가 존재한다.

**Target Outcome:** 자체 Analytics Dashboard가 V1 Product 기능으로 제공되거나 오인되지 않고, 운영 정보는 외부 분석 도구에서 확인한다.

**Why Needed:** 현재 Mock Analytics Dashboard는 명시적인 V1 Non-goal과 충돌한다.

**Dependencies / Notes:** BC-15와 Product 목적은 연결되지만 Mock Dashboard 제거가 외부 integration 구현 방식에 종속된다고 단정하지 않는다.

## BC-17 Production Performance Measurement Capability

**Type:** New Capability

**Related Requirements:** REQ-17

**Current Evidence:** Production Performance와 시각적 안정성을 반복 측정할 script, test 또는 configuration이 없다.

**Target Outcome:** Production Public 핵심 페이지의 로딩 성능과 시각적 안정성을 측정하고 페이지와 측정 시점에 연결해 이후 결과와 비교할 수 있다.

**Why Needed:** 현재는 REQ-17의 품질을 실제 Production에서 검증할 수 없다.

**Dependencies / Notes:** 실제 측정과 최종 검증에는 BC-26의 접근 가능한 Production 환경이 필요하다. V1 Product 단계에서는 임의의 정량 Performance Quality Gate를 두지 않으며 구체적인 기준은 실제 측정과 이후 Engineering/QA 판단에서 결정한다.

## BC-18 Public Content Runtime Verification

**Type:** Verification

**Related Requirements:** REQ-01, REQ-02, REQ-03, REQ-04, REQ-15, REQ-19

**Current Evidence:** Published 목록, 검색, 상세 Supabase 호출은 구현되어 있으나 실제 schema와 Production 또는 검증 환경의 조회 동작은 확인되지 않았다.

**Target Outcome:** Published 목록, 검색, 상세 직접 접근과 Home의 최근 콘텐츠에 필요한 Public read flow가 실제 data 환경에서 정상 동작하는지 확인한다.

**Why Needed:** Code 존재만으로 외부 Supabase와 연결된 사용자 흐름의 성공을 확정할 수 없다.

**Dependencies / Notes:** 검증 결과 실제 Gap이 확인된 경우에만 별도의 Implementation Task를 파생한다.

## BC-19 Author Authentication and Session Verification

**Type:** Verification

**Related Requirements:** REQ-12, REQ-15, REQ-19

**Current Evidence:** Supabase Auth context, login/logout과 `ProtectedRoute`가 있지만 실제 author 계정, 성공·실패·새로고침 session flow는 확인되지 않았다. Login error 처리에도 의심 지점이 있다.

**Target Outcome:** 사전에 등록된 단일 작성자의 로그인, 실패 안내, session 복원, 로그아웃과 보호 route 동작이 실제 환경에서 Requirement와 일치하는지 확인한다.

**Why Needed:** 현재 UI와 client call만으로 인증 outcome을 보장할 수 없다.

**Dependencies / Notes:** BC-20의 인증된 CMS runtime 결과를 해석하기 위한 선행 evidence다. 검증 전에는 인증 결함이나 교체 필요성을 단정하지 않는다.

## BC-20 Admin CMS and Lifecycle Runtime Verification

**Type:** Verification

**Related Requirements:** REQ-07, REQ-08, REQ-09, REQ-10, REQ-11, REQ-15, REQ-19

**Current Evidence:** Post select/insert/update/delete, status 편집, Markdown Preview UI가 존재하지만 실제 database persistence와 end-to-end lifecycle은 검증되지 않았다.

**Target Outcome:** Draft 생성·조회, Preview, 직접 Publish, Draft Publish, Published Update, Unpublish, Delete와 Topic 관리 결과가 실제 data 상태와 일치하는지 확인한다.

**Why Needed:** Repository에 database schema와 외부 policy가 없어 code-level control만으로 CMS 완료 여부를 판단할 수 없다.

**Dependencies / Notes:** BC-19의 Authentication/Session과 BC-21의 Authorization/Draft Isolation은 결과 해석에 필요한 선행 evidence다. 검증 결과에 따라 별도의 Implementation Task가 파생될 수 있다.

## BC-21 Supabase Authorization and Draft Isolation Verification

**Type:** Verification

**Related Requirements:** REQ-01, REQ-02, REQ-08, REQ-09, REQ-11, REQ-12, REQ-13, REQ-18, REQ-19

**Current Evidence:** Repository에 RLS/policy definition이 없다. Public 목록과 검색은 Published filter를 사용하지만 상세는 `id`만 조회하며 UI route 보호는 database authorization boundary가 아니다.

**Target Outcome:** Anonymous 사용자는 Published 콘텐츠만 읽고, 인증된 작성자만 Draft, Preview와 mutation에 접근하며 Draft 직접 URL/API 접근이 차단되는지 확인한다.

**Why Needed:** 핵심 Public/Private 경계를 현재 Repository만으로 확인할 수 없다.

**Dependencies / Notes:** 검증 전에는 RLS 구현이나 교체를 Backlog로 단정하지 않는다. 결과가 실제 authorization 보완 범위를 결정하며 BC-20과 BC-14의 근거가 된다.

## BC-22 Markdown Rendering and Long-form Readability Verification

**Type:** Verification

**Related Requirements:** REQ-05, REQ-08, REQ-16

**Current Evidence:** GFM renderer와 일부 prose style은 있지만 Target Markdown 요소 전체, 긴 글, 이미지·링크, Desktop/Mobile readability에 대한 실행 검증이 없다.

**Target Outcome:** 요구된 Markdown 표현과 기술 콘텐츠가 Public Post 및 Preview에서 의미와 구조를 유지하는지 확인한다.

**Why Needed:** 기본 renderer 존재를 V1 reading experience 완료로 간주할 수 없다.

**Dependencies / Notes:** BC-10과 BC-11이 반영된 뒤 최종 범위를 다시 검증한다. 검증 결과 실제 rendering Gap이 확인된 경우에만 후속 Implementation Task를 만든다.

## BC-23 Public Responsive and Accessibility Verification

**Type:** Verification

**Related Requirements:** REQ-01, REQ-02, REQ-05, REQ-15, REQ-16

**Current Evidence:** Responsive class와 일부 semantic markup은 있으나 mobile pagination 미연결이 확인되었고 overflow 가능성이 있다. Keyboard, Focus, screen reader, contrast audit 결과는 없다.

**Target Outcome:** Desktop과 Mobile에서 Public 핵심 콘텐츠와 탐색을 완전하게 사용하고 기본 Accessibility 기준을 충족하는지 확인한다.

**Why Needed:** 일부 code와 breakpoint 존재만으로 실제 사용성을 판단할 수 없다.

**Dependencies / Notes:** BC-02의 탐색 interaction과 BC-10, BC-11, BC-12의 콘텐츠·상태 경험이 반영된 뒤 최종 검증한다. 확인된 mobile pagination Gap은 BC-02에서 다룬다.

## BC-24 Admin Responsive and Accessibility Verification

**Type:** Verification

**Related Requirements:** REQ-15, REQ-16, REQ-19

**Current Evidence:** Admin에 responsive class는 있지만 Desktop, tablet, 작은 화면의 작성·관리 흐름과 Keyboard·Focus 사용성이 검증되지 않았다.

**Target Outcome:** Desktop-first 핵심 CMS 흐름과 지원되는 작은 화면의 기본 Responsive 및 Accessibility 사용성이 Requirement와 일치하는지 확인한다.

**Why Needed:** V1은 Mobile-first Admin을 요구하지 않지만 기본 사용성을 요구한다.

**Dependencies / Notes:** BC-07, BC-08, BC-09, BC-12로 최종 관리 흐름이 정리된 뒤 검증한다. 검증 결과 실제 Gap이 확인된 경우에만 후속 Implementation Task를 만든다.

## BC-25 Production Crawl and Index Verification

**Type:** Verification

**Related Requirements:** REQ-03, REQ-13, REQ-19

**Current Evidence:** Post data는 browser-side Supabase query로 loading되며 실제 Production HTML과 crawler 동작은 확인되지 않았다.

**Target Outcome:** 검색엔진과 AI 시스템이 공개 페이지와 Published Post를 발견하고 콘텐츠 식별 정보를 이해하며 비공개 영역은 발견하거나 접근하지 못하는지 확인한다.

**Why Needed:** Metadata와 Sitemap의 code 존재만으로 실제 crawl/index 결과를 보장할 수 없다.

**Dependencies / Notes:** BC-13의 metadata, BC-14의 Sitemap/discovery boundary와 BC-26의 실제 Production 환경이 필요하다. 검증 결과에 따라 별도의 Implementation Task가 파생될 수 있다.

## BC-26 Public and Admin Production Availability Verification

**Type:** Verification

**Related Requirements:** REQ-01, REQ-02, REQ-03, REQ-12, REQ-13, REQ-14, REQ-15, REQ-16, REQ-17, REQ-19

**Current Evidence:** 두 application에 build script는 있지만 build 결과, deployed URL, hosting topology, Production environment와 Admin SPA direct navigation은 확인되지 않았다.

**Target Outcome:** 실제 Production에서 Public 핵심 흐름과 인증된 Admin 핵심 흐름, 직접 URL 접근, 새로고침 및 필요한 외부 service 연결이 정상 동작하는지 확인한다.

**Why Needed:** Production availability는 현재 Repository evidence만으로 판단할 수 없다.

**Dependencies / Notes:** 외부 deployment configuration 확인이 필요하다. 실패 원인이 확인된 후에만 deployment 관련 Implementation Task를 만든다. BC-15의 Analytics와 BC-17의 Performance 최종 검증에도 실제 Production 환경이 필요하다.

## BC-27 Sensitive Information Protection Verification

**Type:** Verification

**Related Requirements:** REQ-18, REQ-19

**Current Evidence:** Browser 공개용 environment variable namespace를 사용하고 `.env*`는 ignored지만 실제 deployment 값과 외부 설정은 Repository에서 확인할 수 없다.

**Target Outcome:** Repository/history, browser bundle, runtime output과 Production configuration에 Password, 비공개 Key 또는 기타 Secret이 노출되지 않는지 확인한다.

**Why Needed:** Ignore 규칙과 variable name만으로 실제 Secret protection을 확정할 수 없다.

**Dependencies / Notes:** 실제 값은 문서나 결과에 기록하지 않는다. 검증 결과 실제 노출 또는 분류 문제가 확인된 경우에만 후속 Implementation Task를 만든다.

## Requirement Coverage

| Requirement | Related Backlog |
|---|---|
| REQ-01 Public Home | BC-01, BC-18, BC-21, BC-23, BC-26 |
| REQ-02 Blog Discovery | BC-02, BC-05, BC-12, BC-18, BC-21, BC-23, BC-26 |
| REQ-03 Post Discoverability | BC-03, BC-04, BC-06, BC-13, BC-18, BC-25, BC-26 |
| REQ-04 Post Information | BC-03, BC-05, BC-18 |
| REQ-05 Post Reading Experience | BC-10, BC-11, BC-22, BC-23 |
| REQ-06 Post Representative Image | BC-06 |
| REQ-07 Post Authoring & Draft | BC-03, BC-05, BC-07, BC-12, BC-20 |
| REQ-08 Preview Experience | BC-08, BC-20, BC-21, BC-22 |
| REQ-09 Post Lifecycle | BC-07, BC-12, BC-20, BC-21 |
| REQ-10 Admin Post Management | BC-09, BC-12, BC-20 |
| REQ-11 Topic Management | BC-05, BC-12, BC-20, BC-21 |
| REQ-12 Author Access Control | BC-19, BC-21, BC-26 |
| REQ-13 Crawl & Index Boundary | BC-04, BC-13, BC-14, BC-21, BC-25, BC-26 |
| REQ-14 External Analytics | BC-15, BC-16, BC-26 |
| REQ-15 User State & Failure Feedback | BC-12, BC-18, BC-19, BC-20, BC-23, BC-24, BC-26 |
| REQ-16 Public Usability | BC-02, BC-10, BC-11, BC-22, BC-23, BC-24 |
| REQ-17 Public Performance | BC-17, BC-26 |
| REQ-18 Sensitive Information Protection | BC-21, BC-27 |
| REQ-19 Production Availability | BC-04, BC-05, BC-07, BC-08, BC-09, BC-13, BC-14, BC-15, BC-18, BC-19, BC-20, BC-21, BC-24, BC-25, BC-26, BC-27 |

About과 Activities는 현재 기능 범위가 `Satisfied`로 평가되어 별도의 재구현 Backlog를 만들지 않는다. 관련 V1 완료 여부는 Public Responsive/Accessibility와 Production Availability Verification을 통해 확인한다.
