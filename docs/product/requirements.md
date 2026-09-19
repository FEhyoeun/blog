# V1 Product Requirements

> 이 문서는 V1 완료 여부를 판단하기 위한 Product Requirement와 Acceptance Criteria의 Source of Truth다. 제품의 목표와 범위는 `docs/product/product-definition.md`를 따르며, 현재 구현 상태와 차이는 `docs/product/gap-analysis.md`에서 다룬다. 구체적인 Design 및 Engineering 방식은 이 문서에서 결정하지 않는다.

## 문서 사용 원칙

- 각 Requirement는 V1에서 반드시 만족해야 하는 제품 상태를 정의한다.
- Acceptance Criteria는 Product 행동과 사용자가 관찰할 수 있는 결과를 기준으로 통과 또는 실패를 판단한다.
- 현재 구현되어 있다는 이유만으로 충족된 것으로 간주하지 않는다.
- 구체적인 component 구조, data model, query, routing 구현, 인증 기술, deployment topology는 Design 또는 Engineering 단계에서 결정한다.
- 정량 기준이 정해지지 않은 품질 항목에는 임의의 수치를 적용하지 않는다.

## V1 Scope Boundary

다음 항목은 Initial V1 Requirement에 포함하지 않는다.

- Featured Posts
- Home Topics
- Newsletter / Post Subscription
- AI Summary Generation
- Content Full-text Search
- Autosave
- Manual Slug Management
- Slug Redirect Management
- Archived
- Scheduled Post
- Private Post
- Trash / Revision / Version Management
- External Shareable Draft Preview
- 자체 Analytics Dashboard
- Multi-author
- Public Signup
- Rich / Block Editor
- 복잡한 Related Post / Recommendation 시스템
- SEO/AEO 관리용 별도 Product 또는 Agent

## REQ-01 Public Home

방문자는 Home에서 작성자를 최소한으로 이해하고 최근 기술 콘텐츠로 진입할 수 있어야 한다.

### Acceptance Criteria

- [ ] 방문자가 Home에 접근하면 작성자를 식별할 수 있는 최소한의 소개를 확인할 수 있다.
- [ ] Home의 주요 콘텐츠 영역에서 최근 Published Post를 확인할 수 있다.
- [ ] 최근 콘텐츠는 Published Date 최신순으로 제공된다.
- [ ] Home에 표시된 Post를 선택하면 해당 Published Post의 고유 URL로 이동한다.
- [ ] Draft 또는 Unpublish된 Post는 Home의 콘텐츠 영역에 노출되지 않는다.
- [ ] Home의 정보 구조에서 기술 콘텐츠 탐색이 작성자 상세 소개보다 우선한다.

## REQ-02 Blog Discovery

방문자는 Blog에서 Published Post를 탐색하고 원하는 콘텐츠를 찾을 수 있어야 한다. 검색 대상은 Title, Summary, Topics이며 기본 정렬은 Published Date 최신순이다. Search, Topic, Pagination 상태는 URL에 표현되어야 한다.

### Acceptance Criteria

- [ ] Blog에 접근하면 Published Post 목록이 Published Date 최신순으로 표시된다.
- [ ] 방문자가 검색어를 입력하면 Title, Summary 또는 Topics가 검색 조건에 해당하는 Published Post만 결과에 표시된다.
- [ ] 방문자가 Topic을 선택하면 해당 Topic과 연결된 Published Post만 결과에 표시된다.
- [ ] Search와 Topic 조건을 함께 적용하면 두 조건을 모두 만족하는 Published Post만 결과에 표시된다.
- [ ] 결과가 한 페이지의 표시 범위를 초과하면 방문자가 다른 페이지로 이동할 수 있다.
- [ ] 현재 Search, Topic, Pagination 상태가 URL에 표현되며, 해당 URL에 직접 접근하거나 새로고침해도 같은 탐색 상태가 복원된다.
- [ ] Search, Topic 또는 Pagination 상태가 바뀌면 URL도 현재 상태를 반영한다.
- [ ] Draft 또는 Unpublish된 Post는 기본 목록, 검색 결과, Topic 결과에 노출되지 않는다.

## REQ-03 Post Discoverability

각 Published Post는 고유하고 직접 접근 가능한 URL을 가져야 한다. Slug는 Title 기반으로 자동 생성하며 한글을 포함한 Unicode를 허용한다. 고유 Slug는 최초 Publish 시 확정하고 이후 Title 수정만으로 변경하지 않는다. Published Post는 검색 및 링크 공유 환경에서 콘텐츠를 식별할 수 있는 정보를 제공해야 한다.

### Acceptance Criteria

- [ ] 각 Published Post는 다른 Post와 구별되는 고유 URL을 가진다.
- [ ] 방문자는 Published Post의 고유 URL에 직접 접근할 수 있다.
- [ ] 새 Post의 Slug는 Title을 기반으로 자동 생성된다.
- [ ] 한글을 포함한 Unicode Title로 생성된 Slug는 Unicode를 사용할 수 있다.
- [ ] Slug는 최초 Publish 시 고유한 값으로 확정된다.
- [ ] Published Post의 Title을 수정해도 기존 Slug와 고유 URL은 변경되지 않는다.
- [ ] 생성하려는 Slug가 이미 존재하면 다른 Post와 구별되는 고유 Slug가 생성된다.
- [ ] Published Post의 검색 및 링크 공유 정보에 Title, Summary, 대표 이미지와 고유 URL이 반영된다.
- [ ] Published Post의 고유 URL은 해당 콘텐츠를 대표하는 Canonical URL로 식별된다.

## REQ-04 Post Information

Published Post에서 Title, Summary, 최초 Published Date, 필요한 경우 Updated Date, Topics를 확인할 수 있어야 한다. Published Post를 수정해도 Published Date는 유지하고 Updated Date를 갱신한다.

### Acceptance Criteria

- [ ] Published Post에서 Title과 Summary를 확인할 수 있다.
- [ ] Published Post에서 최초 Published Date를 확인할 수 있다.
- [ ] Published Post가 발행 후 수정되면 최초 Published Date는 변경되지 않는다.
- [ ] Published Post가 발행 후 수정되면 Updated Date가 갱신되고 독자가 이를 확인할 수 있다.
- [ ] Post에 Topic이 연결되어 있으면 Published Post에서 해당 Topics를 확인할 수 있다.
- [ ] Topic이 없는 Post도 정보 누락으로 오인되는 표시 없이 정상적으로 읽을 수 있다.

## REQ-05 Post Reading Experience

Published Post는 기술 콘텐츠를 읽는 데 필요한 Markdown 표현을 올바르게 제공해야 하며, Heading 구조를 탐색할 수 있는 Table of Contents를 제공해야 한다.

### Acceptance Criteria

- [ ] Heading, Paragraph, Link, Image, List, Table, Blockquote, Inline Code가 콘텐츠의 의미와 구조를 유지하며 표시된다.
- [ ] Code Block은 일반 본문과 구분되어 표시된다.
- [ ] 언어 정보가 있는 Code Block에는 해당 언어에 맞는 Syntax Highlighting이 적용된다.
- [ ] Published Post에 TOC를 구성할 Heading이 있으면 해당 Heading 구조를 반영한 Table of Contents가 자동으로 제공된다.
- [ ] TOC를 구성할 Heading이 없으면 Table of Contents를 표시하지 않는다.
- [ ] Table of Contents의 항목을 선택하면 해당 본문 구간으로 이동한다.
- [ ] Link와 Image는 독자가 콘텐츠를 읽는 흐름을 방해하는 깨진 표현 없이 제공된다.

## REQ-06 Post Representative Image

Published Post의 대표 이미지는 작성자가 지정한 Cover Image, 본문의 첫 번째 이미지, 시스템 Default Image 순서로 결정한다. 따라서 모든 Published Post에는 사용할 수 있는 대표 이미지가 존재해야 한다.

### Acceptance Criteria

- [ ] Cover Image가 지정된 Post는 해당 이미지를 대표 이미지로 사용한다.
- [ ] Cover Image가 없고 본문에 이미지가 있으면 본문의 첫 번째 이미지를 대표 이미지로 사용한다.
- [ ] Cover Image와 본문 이미지가 모두 없으면 시스템 Default Image를 대표 이미지로 사용한다.
- [ ] 대표 이미지 결정 우선순위는 Public 화면과 검색 및 링크 공유 정보에서 일관되게 적용된다.
- [ ] Published Post에는 세 우선순위 중 하나로 결정된 사용 가능한 대표 이미지가 항상 존재한다.

## REQ-07 Post Authoring & Draft

작성자는 Admin에서 Markdown 기반 Post를 작성하고 수정할 수 있어야 한다. Publish하려면 Title, Summary, Content가 비어 있지 않고 유효한 고유 Slug를 생성할 수 있어야 한다. Topics와 직접 지정하는 Cover Image는 선택 사항이며 임의의 최소 글자 수는 정의하지 않는다. Draft 저장은 명시적인 사용자 동작이고 V1에서는 Autosave를 제공하지 않는다. Publish 조건을 만족하면 Save Draft 없이 직접 Publish할 수 있다.

### Acceptance Criteria

- [ ] 인증된 작성자는 Admin에서 새 Markdown Post를 작성할 수 있다.
- [ ] 인증된 작성자는 기존 Draft 또는 Published Post의 Title, Summary, Content, Topics와 Cover Image를 수정할 수 있다.
- [ ] Title, Summary, Content 중 하나라도 비어 있거나 유효한 고유 Slug를 생성할 수 없으면 Publish할 수 없으며 충족하지 않은 조건을 확인할 수 있다.
- [ ] Title, Summary, Content가 비어 있지 않고 유효한 고유 Slug를 생성할 수 있으면 Topics 또는 직접 지정한 Cover Image가 없어도 Publish할 수 있다.
- [ ] 작성자가 Save Draft를 명시적으로 실행하면 현재 입력 내용이 Draft로 저장된다.
- [ ] 작성 중 명시적인 저장 동작을 하지 않은 내용은 Autosave되지 않는다.
- [ ] Publish 조건을 충족한 새 Post는 먼저 Save Draft를 실행하지 않아도 직접 Publish할 수 있다.

## REQ-08 Preview Experience

Admin Editor는 작성 중인 콘텐츠를 확인할 수 있는 Live Preview를 제공해야 한다. 또한 실제 Published Post의 읽기 경험과 최대한 동일한 Full Preview를 제공해야 한다. Preview는 저장과 독립적이며 Preview 자체가 Save Draft 또는 Publish를 발생시키지 않는다.

### Acceptance Criteria

- [ ] 작성자는 Admin Editor에서 현재 작성 중인 Markdown Content의 Live Preview를 확인할 수 있다.
- [ ] Live Preview는 저장하지 않은 현재 입력 내용을 반영한다.
- [ ] 작성자는 현재 작성 중인 Post의 Full Preview를 확인할 수 있다.
- [ ] Full Preview는 Published Post에서 지원하는 Markdown 표현과 주요 읽기 구조를 동일하게 확인할 수 있게 제공한다.
- [ ] Draft와 새로 작성 중인 Post도 인증된 작성자가 Preview할 수 있다.
- [ ] Live Preview 또는 Full Preview를 열거나 확인하는 동작만으로 Save Draft, Publish 또는 Post 상태 변경이 발생하지 않는다.
- [ ] Admin Preview는 인증되지 않은 방문자에게 공개되지 않는다.

## REQ-09 Post Lifecycle

V1 Post 상태는 Draft와 Published다. 작성자는 정의된 lifecycle에 따라 Post를 저장, 발행, 수정, 발행 취소 및 영구 삭제할 수 있어야 한다.

### Acceptance Criteria

- [ ] 새 Post에서 Save Draft를 실행하면 해당 Post는 Draft 상태가 된다.
- [ ] Publish 조건을 충족한 새 Post에서 Publish를 실행하면 해당 Post는 Published 상태가 된다.
- [ ] Publish 조건을 충족한 Draft에서 Publish를 실행하면 해당 Post는 Published 상태가 된다.
- [ ] Published Post를 수정하고 Save Changes를 실행하면 변경 사항이 반영되며 상태는 Published로 유지된다.
- [ ] Published Post에서 Unpublish를 실행하면 해당 Post는 Draft 상태가 되고 Public 접근 및 discovery 대상에서 제외된다.
- [ ] Draft 또는 Published Post에서 Delete를 실행하면 영구 삭제임을 알리는 명확한 확인 절차가 먼저 제공된다.
- [ ] 삭제 확인을 완료하면 해당 Post는 영구 삭제되고, 취소하면 삭제되지 않는다.
- [ ] V1의 Post 상태와 관리 흐름에 Trash 또는 Archived 상태가 나타나지 않는다.

## REQ-10 Admin Post Management

작성자는 Admin에서 전체 Post를 확인하고 상태와 Title을 기준으로 필요한 Post를 찾을 수 있어야 한다.

### Acceptance Criteria

- [ ] 인증된 작성자는 Admin에서 Draft와 Published Post를 포함한 전체 Post 목록을 확인할 수 있다.
- [ ] All 필터를 선택하면 Draft와 Published Post가 모두 표시된다.
- [ ] Draft 필터를 선택하면 Draft Post만 표시된다.
- [ ] Published 필터를 선택하면 Published Post만 표시된다.
- [ ] Title 검색을 실행하면 Title이 검색 조건에 해당하는 Post만 표시된다.
- [ ] 상태 필터와 Title 검색을 함께 적용하면 두 조건을 모두 만족하는 Post만 표시된다.
- [ ] 목록의 각 Post에서 현재 Draft 또는 Published 상태를 구분할 수 있다.
- [ ] 목록에서 선택한 Post의 편집 흐름으로 진입할 수 있다.

## REQ-11 Topic Management

Post는 0개 이상의 Topic을 가질 수 있다. 작성자는 Post 편집 과정에서 기존 Topic을 확인·검색·선택하거나 새 Topic을 생성할 수 있어야 하며, Admin에서 Topic 목록 확인, 생성, 이름 변경, 삭제를 수행할 수 있어야 한다.

### Acceptance Criteria

- [ ] Topic을 선택하지 않은 Post도 Draft 저장 및 Publish가 가능하다.
- [ ] 하나의 Post에 하나 이상의 Topic을 연결할 수 있다.
- [ ] 작성자는 Post 편집 과정에서 기존 Topic을 확인하고 이름으로 검색할 수 있다.
- [ ] 작성자는 검색한 Topic을 Post에 선택하거나 선택을 해제할 수 있다.
- [ ] 필요한 Topic이 없으면 Post 편집 흐름에서 새 Topic을 생성하고 선택할 수 있다.
- [ ] 인증된 작성자는 Admin에서 전체 Topic 목록을 확인하고 Topic을 생성하거나 이름을 변경할 수 있다.
- [ ] 사용 중이지 않은 Topic을 삭제할 수 있다.
- [ ] 사용 중인 Topic을 삭제하려 하면 영향받는 Post 수와 Topic 연결이 제거된다는 사실을 포함한 명확한 확인 절차가 제공된다.
- [ ] 사용 중인 Topic 삭제를 확인하면 Topic과 Post의 연결은 제거되지만 Post 자체는 삭제되지 않는다.
- [ ] Topic 삭제를 취소하면 Topic과 기존 Post 연결은 변경되지 않는다.

## REQ-12 Author Access Control

Admin은 사전에 등록된 단일 작성자만 사용할 수 있다. 작성자는 ID와 Password로 인증하고 로그아웃할 수 있어야 한다. Published 콘텐츠는 누구나 접근할 수 있지만 Draft, Admin Preview와 콘텐츠 관리 기능은 인증된 작성자만 접근할 수 있어야 한다.

### Acceptance Criteria

- [ ] 사전에 등록된 작성자는 유효한 ID와 Password로 인증할 수 있다.
- [ ] 등록되지 않았거나 유효하지 않은 인증 정보로는 Admin에 접근할 수 없다.
- [ ] 인증된 작성자는 명시적으로 로그아웃할 수 있다.
- [ ] 로그아웃 후에는 Draft, Admin Preview와 콘텐츠 관리 기능에 접근할 수 없다.
- [ ] 인증되지 않은 방문자가 Admin 또는 Admin Preview에 직접 접근하면 비공개 콘텐츠나 관리 기능이 노출되지 않는다.
- [ ] 인증되지 않은 방문자는 URL 또는 직접적인 data 접근을 통해 Draft 콘텐츠를 조회할 수 없다.
- [ ] 인증된 작성자만 Post와 Topic의 생성, 수정, 상태 변경 및 삭제를 수행할 수 있다.
- [ ] Published 콘텐츠는 작성자 인증 없이 접근할 수 있다.
- [ ] V1에는 Public Signup, Multi-author 또는 복잡한 Role 관리 기능이 제공되지 않는다.

## REQ-13 Crawl & Index Boundary

검색엔진과 AI 시스템은 공개 콘텐츠를 발견하고 이해할 수 있어야 한다. 비공개 콘텐츠와 관리 영역은 공개적으로 발견하거나 접근할 수 없어야 한다.

### Acceptance Criteria

- [ ] Home, Blog, Published Post, About, Activities와 공개 콘텐츠 탐색 영역은 공개 discovery 대상에 포함된다.
- [ ] Published Post는 공개 discovery 정보에서 고유 URL과 콘텐츠를 식별하는 정보를 제공한다.
- [ ] 공개 Sitemap에는 discovery 대상인 Published Post가 포함된다.
- [ ] Draft와 Unpublish된 Post는 공개 목록, 검색, Topic 탐색, Sitemap과 기타 공개 discovery 결과에서 제외된다.
- [ ] Draft 또는 Unpublish된 Post의 이전 Public URL에 접근해도 비공개 콘텐츠가 노출되지 않는다.
- [ ] Admin, Admin Preview와 인증 영역은 공개 discovery 대상에서 제외된다.
- [ ] 공개 콘텐츠와 비공개 콘텐츠의 discovery 경계가 Production에서도 동일하게 유지된다.

## REQ-14 External Analytics

작성자는 외부 분석 도구를 통해 운영에 필요한 방문 및 콘텐츠 소비 정보를 확인할 수 있어야 한다. V1에서는 자체 Analytics Dashboard를 개발하지 않으며 불필요한 방문자 프로파일링을 목적으로 하지 않는다.

### Acceptance Criteria

- [ ] 작성자는 외부 분석 도구에서 전체 방문 현황을 확인할 수 있다.
- [ ] 작성자는 외부 분석 도구에서 주요 유입 경로를 확인할 수 있다.
- [ ] 작성자는 외부 분석 도구에서 개별 Published Post의 조회 현황을 구분해 확인할 수 있다.
- [ ] 선택한 외부 도구가 검색 유입 키워드 또는 검색 성과를 제공하는 경우 작성자가 해당 정보를 확인할 수 있다.
- [ ] V1 Admin에는 자체 Analytics Dashboard가 제품 기능으로 제공되지 않는다.

## REQ-15 User State & Failure Feedback

Public과 Admin의 핵심 흐름은 Loading, Empty, Error 및 작업 성공·실패 상태를 명확하게 전달해야 한다. 실패한 작업을 정상 상태 또는 성공으로 오인하게 해서는 안 된다.

### Acceptance Criteria

- [ ] Public의 콘텐츠 목록, 검색, Topic 탐색과 Post 조회 중 Loading 상태를 사용자가 인지할 수 있다.
- [ ] Public의 목록, 검색 또는 Topic 결과가 없으면 현재 조건에 맞는 Empty 상태가 표시된다.
- [ ] Public의 콘텐츠 조회가 실패하면 정상적인 Empty 상태와 구분되는 Error 상태가 표시된다.
- [ ] Admin의 인증, Post 목록, 편집, 저장, 발행, 발행 취소, 삭제와 Topic 관리 작업 중 필요한 Loading 상태를 확인할 수 있다.
- [ ] Admin 작업이 성공하면 사용자가 완료 사실과 반영된 결과를 확인할 수 있다.
- [ ] Admin 작업이 실패하면 실패 사실을 확인할 수 있고 성공한 것처럼 표시되거나 상태가 전환되지 않는다.

## REQ-16 Public Usability

Public 핵심 콘텐츠와 탐색 기능은 Desktop과 Mobile에서 모두 완전하게 사용할 수 있어야 한다. Public은 기본적인 Accessibility를 제공해야 하며, Admin은 Desktop-first를 유지하면서 기본적인 Responsive 및 Accessibility 사용성을 제공한다.

### Acceptance Criteria

- [ ] Desktop과 Mobile에서 Home, Blog, Search, Topic 탐색, Pagination, Published Post, About과 Activities를 사용할 수 있다.
- [ ] 화면 크기 때문에 Public 핵심 정보가 잘리거나 접근할 수 없는 상태가 되지 않는다.
- [ ] 화면 크기 때문에 Public 핵심 탐색 또는 읽기 기능이 사라지거나 사용할 수 없는 상태가 되지 않는다.
- [ ] Public 핵심 흐름을 Keyboard로 탐색하고 조작할 수 있으며 현재 Focus를 식별할 수 있다.
- [ ] Public의 주요 콘텐츠 구조와 interactive control은 보조 기술이 목적과 상태를 이해할 수 있는 정보를 제공한다.
- [ ] 콘텐츠와 핵심 control은 읽고 구분할 수 있는 시각적 표현을 제공한다.
- [ ] Admin의 핵심 작성 및 관리 흐름은 Desktop에서 완전하게 사용할 수 있다.
- [ ] Admin은 지원되는 작은 화면에서도 핵심 정보와 control에 접근할 수 있고 기본적인 Keyboard 및 Focus 사용성을 제공한다.

## REQ-17 Public Performance

Public 핵심 페이지는 콘텐츠 탐색과 읽기를 방해하지 않는 수준의 로딩 성능과 시각적 안정성을 제공해야 한다. 특히 Published Post의 핵심 텍스트 콘텐츠는 불필요한 지연 없이 접근 가능해야 하며, Production에서 실제 성능을 측정하고 검증할 수 있어야 한다.

### Acceptance Criteria

- [ ] Production의 Home, Blog와 Published Post에서 사용자가 핵심 콘텐츠를 기다리는 동안 현재 상태를 인지할 수 있다.
- [ ] Published Post의 핵심 텍스트 콘텐츠가 부가 기능이나 비핵심 asset 때문에 불필요하게 차단되지 않는다.
- [ ] Public 핵심 페이지를 불안정하게 만드는 예기치 않은 주요 layout 이동 없이 콘텐츠를 탐색하고 읽을 수 있다.
- [ ] Production 환경의 Public 핵심 페이지를 대상으로 로딩 성능과 시각적 안정성을 측정할 수 있다.
- [ ] 측정 결과를 페이지와 측정 시점에 연결해 이후 검증에서 비교할 수 있다.
- [ ] V1 완료 판단에는 정량 Quality Gate가 별도로 결정되기 전까지 임의의 성능 수치를 적용하지 않는다.

## REQ-18 Sensitive Information Protection

Password, 비공개 Key와 기타 Secret은 Public Client 또는 공개 Repository를 통해 노출되어서는 안 된다. Public 설정값과 Secret의 기술적 분류 및 관리 방법은 Engineering 단계에서 결정한다.

### Acceptance Criteria

- [ ] 공개 Repository의 추적 대상 code, configuration, documentation과 history에 실제 Password, 비공개 Key 또는 기타 Secret이 포함되지 않는다.
- [ ] Public Client가 전달하거나 노출하는 runtime 정보에 Password, 비공개 Key 또는 기타 Secret이 포함되지 않는다.
- [ ] 인증 실패나 application 오류가 Password, 비공개 Key 또는 기타 Secret을 사용자 화면이나 공개 log에 노출하지 않는다.
- [ ] 작성자의 Password는 화면, URL 또는 사용자에게 보이는 상태에 평문으로 다시 표시되지 않는다.
- [ ] Production에 필요한 Secret은 공개 설정값과 구분되어 Public Client 및 공개 artifact에 포함되지 않는다.

## REQ-19 Production Availability

Public Blog와 Admin의 핵심 기능은 실제 Production 환경에서 사용할 수 있어야 하며, 정의된 Public/Private 및 Author 권한 경계가 Production에서도 유지되어야 한다.

### Acceptance Criteria

- [ ] Production Public Blog에서 Home, Blog, Search, Topics, Published Post, About과 Activities의 핵심 흐름을 사용할 수 있다.
- [ ] Production Public Blog에서 각 Published Post의 고유 URL에 직접 접근할 수 있다.
- [ ] Production Admin에서 등록된 작성자가 인증하고 로그아웃할 수 있다.
- [ ] Production Admin에서 인증된 작성자가 Post 작성, Draft 저장, Preview, Publish, Update, Unpublish와 Delete를 수행할 수 있다.
- [ ] Production Admin에서 인증된 작성자가 Topic 목록 확인, 생성, 이름 변경과 삭제를 수행할 수 있다.
- [ ] Production에서 인증되지 않은 방문자는 Draft, Admin Preview와 콘텐츠 관리 기능에 접근할 수 없다.
- [ ] Production에서 Published 콘텐츠는 인증 없이 접근할 수 있다.
- [ ] Production의 주요 Public 및 Admin URL에 직접 접근하거나 새로고침해도 해당 핵심 흐름을 계속 사용할 수 있다.
- [ ] Production의 핵심 흐름에서 필요한 runtime 설정과 외부 service 연결이 유효하며, 설정되지 않은 상태를 정상 동작으로 오인하지 않는다.
