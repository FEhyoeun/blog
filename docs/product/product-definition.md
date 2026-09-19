# Target Product Definition

> 이 문서는 제품의 목표 상태(Target Product)와 Initial V1 Scope를 정의하는 Product Source of Truth다. 현재 구현 상태는 설명하지 않으며, 구체적인 Design 및 Engineering 방식은 해당 단계의 문서에서 결정한다.

## Product Vision

이 제품은 개발 과정에서 얻은 지식과 경험을 지속적으로 기록하고 축적하는 개인 기술 블로그다.

방문자는 콘텐츠를 쉽게 발견하고 읽을 수 있어야 하며, 콘텐츠를 통해 작성자가 어떤 개발자인지 자연스럽게 이해할 수 있어야 한다. 동시에 이 Repository는 실제 제품을 장기간 운영하면서 Harness Engineering을 설계하고 실험하며 개선하는 Engineering Playground로 활용한다.

제품의 우선순위는 다음과 같다.

1. Technical Blog / Knowledge Archive
2. Personal Branding
3. Developer Portfolio

Harness Engineering Playground는 별도의 Engineering Goal이다. 포트폴리오를 보여주기 위해 블로그를 만드는 것이 아니라, 실제로 사용하는 기술 블로그를 잘 만들고 운영한 결과가 포트폴리오가 되는 방향을 지향한다.

## Target Users

### Reader

- 기술 콘텐츠를 발견하고 읽는 방문자
- 필요한 경우 작성자의 경력과 활동을 확인하는 방문자

### Author

- 한 명의 작성자(Single author)
- 콘텐츠를 작성하고 관리하며 발행한다.

일반 사용자 회원가입, 다중 작성자, 커뮤니티 사용자는 Target Product에 포함하지 않는다.

## Public Experience

### Home

- Minimal Author Identity
- Recent Published Posts
- 콘텐츠 발견을 위한 Entry Point

Home의 중심은 자기소개가 아니라 콘텐츠다.

Featured Posts와 Home Topics는 Initial V1에 포함하지 않는다. 향후 필요성이 확인되면 확장할 수 있다. 이는 Initial V1의 Blog Topic discovery 범위와 별개다.

### Blog

- Search
- Topics
- Post List
- URL-based Pagination

### Post

- Technical Content Reading Experience
- Topics

### About

- Introduction
- Career
- Education
- Contact

About은 작성자가 어떤 개발자인지 보여준다.

### Activities

- Projects
- Talks / Content
- Community
- Learning / Knowledge Sharing

Activities는 작성자가 회사 밖에서 무엇을 만들고, 배우고, 공유했는지 보여준다.

## Content Model

모든 글은 하나의 `Post` 모델로 통합한다. 기술 학습, 문제 해결, 회고, 커리어 이야기, Harness Engineering 실험을 별도 Content Type으로 분리하지 않으며, 콘텐츠의 의미는 Topics로 표현한다.

`Post`는 개념적으로 다음 정보를 가진다.

- Title
- Summary / Description
- Slug
- Topics
- Cover Image
- Markdown Content
- Status

Category hierarchy는 사용하지 않는다. Search와 URL-based Pagination을 제공한다.

새 Post의 Slug는 Title을 기반으로 자동 생성하며 한글을 포함한 Unicode를 허용한다. 고유 Slug는 최초 Publish 시 확정하고, 이후 Title 수정만으로 변경하지 않는다. 동일한 Slug가 이미 존재하면 시스템이 고유한 Slug를 생성한다. V1에서는 작성자의 수동 Slug 관리와 Slug 변경을 위한 Redirect 관리를 제공하지 않는다.

Related Posts는 현재 핵심 범위가 아니다. 콘텐츠가 충분히 축적된 후 필요성을 다시 평가한다.

## Post Lifecycle

기본 상태는 `Draft`와 `Published`다.

```text
Draft -> Preview -> Publish -> Published -> Edit / Update
```

### Draft

- 일반 사용자에게 공개하지 않는다.
- Public Search, Topics, Sitemap 등 discovery 대상에서 제외한다.
- Author는 Preview할 수 있다.

### Published

- Public 접근을 허용한다.
- Public discovery 대상에 포함한다.

Publish하려면 Title, Summary, Content가 비어 있지 않고 유효한 고유 Slug를 생성할 수 있어야 한다. Topics와 작성자가 직접 지정하는 Cover Image는 필수 조건이 아니며, 임의의 최소 글자 수는 정의하지 않는다.

`Archived`는 장기 운영 후 필요성이 확인되면 검토할 Future Candidate다. `Private Post`는 현재 Target Product에 포함하지 않는다.

## Admin CMS

Admin은 Single-author CMS다.

핵심 책임은 다음과 같다.

- Post 생성
- Post 수정
- Post 삭제
- Save Draft
- Live Preview
- Full Preview
- Publish
- Topic 관리

Editor는 Markdown 기반으로 유지한다. Notion-style Block Editor와 Rich Text Editor는 현재 범위에 포함하지 않는다.

Save Draft는 작성자의 명시적인 action이며 V1에서는 Autosave를 제공하지 않는다. Preview는 저장과 독립적이고 Preview 자체가 Save Draft 또는 Publish를 발생시키지 않는다. Publish 조건을 만족한 새 Post는 Save Draft 없이 직접 Publish할 수 있다.

Live Preview는 Admin Editor에서 현재 작성 중인 콘텐츠를 보여준다. Full Preview는 실제 Published Post의 reading experience에 최대한 가까운 경험을 제공한다. 두 Preview는 인증된 작성자만 사용할 수 있다.

이미지 업로드 방식과 Preview의 구체적인 UX 및 implementation은 필요한 경우 이후 Design 또는 Engineering 단계에서 결정한다.

## Discoverability

Published 콘텐츠는 검색엔진과 AI 기반 정보 탐색 환경에서 발견되고 이해될 수 있어야 한다.

Product-level goal은 다음과 같다.

- Crawl / Index 가능
- 고유 URL
- 적절한 metadata
- Canonical
- Open Graph
- Sitemap
- Article / Author information
- Semantic content structure

Draft는 public discovery 대상이 아니다. SEO/AEO의 구체적인 기술 구현 방법은 Engineering 단계에서 결정한다.

## Analytics

자체 Analytics 제품을 구축하지 않는다. 외부 Analytics 서비스를 활용해 운영에 필요한 수준에서 다음 정보를 파악한다.

- Traffic
- Acquisition
- Content Consumption

필요 이상의 사용자 Tracking은 제품 목적에 포함하지 않는다.

현재 존재하는 Mock Analytics Dashboard는 Target Product의 핵심 범위에서 제외한다. 실제 운영 후 Admin Analytics가 필요해지면 별도의 요구사항으로 다시 평가한다.

## Quality Bar

Public Blog의 핵심 사용자 흐름은 Desktop과 Mobile에서 정상적으로 사용할 수 있어야 한다.

필수 품질은 다음과 같다.

- Responsive UI
- Loading state
- Empty state
- Error state
- 기본적인 Accessibility
- Technical Content Reading Experience
- Production에서 Performance와 SEO 품질을 측정하고 검증할 수 있는 상태

Post의 Markdown reading experience는 다음 기술 콘텐츠를 자연스럽게 표현할 수 있어야 한다.

- Heading
- Code block
- Syntax highlighting
- Inline code
- Link
- Image
- List
- Table
- Blockquote
- Heading 구조 기반 Table of Contents
- 긴 글의 readability
- Mobile readability

Table of Contents는 Published Post의 Heading 구조를 기반으로 자동 생성한다. 구성할 Heading이 없으면 표시하지 않으며, 글자 수 등의 별도 threshold는 두지 않는다.

Admin은 Desktop 중심으로 최적화하되 기본적인 Responsive 품질을 유지한다.

구체적인 Lighthouse 목표, WCAG level, breakpoint, verification tool은 현재 Product Definition에서 결정하지 않는다.

## Production & Security

Public Blog와 Admin CMS 모두 실제 Production 환경에서 사용할 수 있어야 한다.

### Anonymous visitor

- Published Content 접근 가능
- Search / Topics 사용 가능
- About / Activities 접근 가능
- Draft 접근 불가
- Admin 접근 불가

### Authenticated Author

- Admin 접근 가능
- Draft 작성 및 조회 가능
- Preview 가능
- Publish / Update 가능
- Topic 관리 가능

Admin UI를 숨기는 것만으로 접근을 보호해서는 안 되며, 실제 data/API 접근에도 Authorization을 적용해야 한다. Draft는 URL 또는 API 직접 접근을 포함해 public user에게 노출되어서는 안 된다.

Secret과 Credential은 client 또는 public Repository에 노출되어서는 안 된다.

Public Blog와 Admin CMS의 구체적인 Production deployment topology는 Product 단계에서 고정하지 않는다. 현재 Repository의 Monorepo 구조와 Supabase 기반 Architecture를 분석한 뒤 Engineering 단계에서 결정한다.

별도의 Staging 환경은 현재 필수 Requirement가 아니다.

## Non-goals / Scope Boundary

Initial V1에서는 다음을 의도적으로 만들지 않는다.

- Featured Posts
- Home Topics
- Newsletter / Post Subscription
- AI Summary Generation
- Content Full-text Search
- Autosave
- Multi-author
- Public signup / 일반 사용자 계정
- 복잡한 Role & Permission 시스템
- Comment / Like / Follow
- Rich Text / Notion-style Block Editor
- Scheduled Publish
- Private Post
- Archived lifecycle
- Trash / Revision / Version Management
- External Shareable Draft Preview
- 자체 Analytics 시스템 / Analytics Dashboard
- Category hierarchy
- 복잡한 Related Post / Recommendation 시스템
- 별도 Staging 환경 의무화
- Mobile-first Admin authoring experience
- Activities 전용 복잡한 관리 시스템
- SEO/AEO 전용 관리 제품
- Product Requirement 또는 확인된 Engineering 문제를 해결하는 데 필요하지 않은 과도한 Architecture 복잡화

Non-goal은 영구적으로 금지된 기능을 의미하지 않는다. 실제 운영 과정에서 필요성이 확인되면 Future Backlog로 다시 평가할 수 있다.

## Product / Engineering Boundary

### Product

- 실제 운영 가능한 Personal Technical Blog

### Engineering Goal

- Harness Engineering Playground
- Context Engineering
- Agent Workflow
- Verification
- Orchestration

### Portfolio

- Product와 Engineering 과정을 실제로 수행한 결과

Harness Engineering을 보여주기 위해 불필요한 Product Feature를 추가하거나 Product를 복잡하게 만들지 않는다.

## Deferred Decisions

다음 항목은 이 Product Definition에서 결정하지 않는다.

- 이미지 업로드 방식
- Slug algorithm, collision suffix 형식, encoding 방식
- Table of Contents의 heading depth, numbering, 위치, anchor 세부 동작
- SEO/AEO의 구체적인 기술 구현
- 구체적인 Lighthouse 목표
- WCAG level
- breakpoint
- verification tool
- Public Blog와 Admin CMS의 Production deployment topology

이 항목은 필요한 경우 이후 Design 또는 Engineering 단계에서 결정한다.
