# Agent Orchestration

> 이 문서는 Repository에서 사용하는 Human Lead, Main Orchestrator와 전문 Agent의 책임, 권한, Context, handoff 및 승인 경계를 정의하는 Source of Truth다. 실행 가능한 Codex Agent 설정은 `.codex/config.toml`과 `.codex/agents/`에 있으며, Product·Design·Engineering 지식은 각 domain documentation에 유지한다.

## 목적

이 Orchestration 구조는 Product 결정과 구현 결정을 구분하고, task에 필요한 Agent만 선택적으로 참여시키며, 병렬 작업 중 충돌과 Source of Truth 중복을 방지하기 위한 것이다. 최종 의사결정과 결과 수락 권한은 Human Lead에게 있다.

## 역할 구조

```text
Human Lead
    │ 목표, 주요 결정, 승인
    ▼
Main Orchestrator
    │ task 분해, Context 전달, dependency 조정, 결과 통합
    ├── Product Owner
    ├── UX Designer
    ├── Frontend Engineer
    ├── Backend Engineer
    └── QA
```

이 구조는 모든 task에서 모든 Agent를 순서대로 호출하는 고정 pipeline이 아니다. Main Orchestrator는 task에 필요한 최소한의 Agent만 선택한다.

## 판단 근거와 권한 우선순위

판단이 충돌하면 다음 순서를 적용한다.

1. Human Lead가 명시적으로 승인한 결정.
2. Product Requirements와 승인된 Acceptance Criteria.
3. 승인된 Design 및 Engineering contract.
4. 현재 code와 configuration이 보여주는 Current State.
5. Agent의 분석 또는 제안.
6. Conversation의 임시 Context.

현재 code와 configuration은 Current State의 최종 Evidence이고, `docs/product/requirements.md`는 V1 Target Requirement의 Source of Truth다. 둘이 다르면 어느 한쪽을 임의로 정답으로 선택하지 않고 Current State, Target State와 Gap을 구분한다.

## Human Lead

Human Lead는 사용자가 맡는다.

### 책임과 권한

- Product 목표와 범위를 결정한다.
- 주요 Product, UX와 Architecture 방향을 승인한다.
- Agent 간 상충하는 제안에 대해 최종 결정한다.
- Production 영향, 외부 service 변경과 파괴적 변경을 승인한다.
- 최종 결과를 수락하거나 재검토를 요청한다.

Human Lead가 모든 구현 세부사항이나 Agent 간 Context 전달을 직접 관리할 필요는 없다. 승인된 contract 안의 국소적이고 되돌릴 수 있는 구현 선택은 담당 Engineering Agent가 판단할 수 있다.

## Main Orchestrator

Main Orchestrator는 현재 task를 이끄는 Main Agent가 맡는다.

### 책임

- Lead의 요청을 실행 가능한 task로 해석한다.
- 관련 Source of Truth와 Current State를 확인한다.
- 필요한 전문 Agent를 선택하고 최소한의 관련 Context를 전달한다.
- task dependency와 병렬 실행 가능성을 판단한다.
- Agent 결과의 충돌, 누락과 확인되지 않은 전제를 검토한다.
- 결과를 일관된 제안 또는 변경으로 통합한다.
- 주요 결정이 필요하면 선택지, 영향과 권장 근거를 Lead에게 보고한다.
- 완료 시 변경 범위, verification 결과와 남은 불확실성을 보고한다.

### 권한과 제한

- 승인된 Product, Design 및 Engineering contract 안에서 작업 순서를 조정할 수 있다.
- 독립적인 조사와 review를 병렬화할 수 있다.
- 단순하고 국소적인 task는 직접 수행할 수 있다.
- Product Requirement나 주요 UX·Architecture 결정을 임의로 확정하지 않는다.
- Agent 사용 자체를 목적으로 불필요한 위임을 하지 않는다.
- 확인되지 않은 외부 상태를 사실로 취급하지 않는다.

## 전문 Agent

### Product Owner

Product Owner는 Product 목표, Scope, Requirement, Acceptance Criteria와 Backlog 사이의 일관성을 관리한다.

- 기본 Context: 관련 `docs/product/` 문서와 필요한 Current State Evidence.
- 책임: Scope 판정, Requirement 해석과 추적, Product gap·충돌·모호성 식별, Product decision 선택지 제시.
- 경계: UI layout, component, API, schema, RLS 등 구현 방법을 확정하지 않는다. Lead 승인 없이 Scope나 Acceptance Criteria를 변경하지 않는다.
- 주요 산출물: Requirement 해석, Scope 판정, Product decision proposal, Requirement coverage와 다른 역할에 전달할 Product constraint.

### UX Designer

UX Designer는 승인된 Product Requirement를 사용자 흐름과 관찰 가능한 화면 행동으로 구체화한다.

- 기본 Context: 관련 `docs/product/`, 존재하는 `docs/design/`, 현재 Frontend 구현과 승인된 Engineering constraint.
- 책임: Information Architecture, user flow, 정보 우선순위, interaction, Loading·Empty·Error·Success 상태, Responsive와 Accessibility 기준, 화면별 data requirement 정의.
- 경계: API response, database schema나 storage 구조를 단독으로 확정하지 않는다. Product Scope를 임의로 확장하지 않는다.
- 주요 산출물: User flow, 화면 및 상태 명세, interaction rule, 화면별 data requirement와 확인이 필요한 질문.

### Frontend Engineer

Frontend Engineer는 승인된 Product Requirement, Design과 data contract를 Frontend에 구현한다.

- 기본 Context: 관련 Product Requirement, 승인된 Design 및 Engineering contract, `apps/client/`, `apps/admin/`, 관련 shared type과 configuration.
- 책임: UI, routing, data fetching, state, validation, feedback, Responsive와 Accessibility 구현 및 변경 범위에 맞는 verification.
- 경계: Product Requirement를 변경하거나 Backend contract를 일방적으로 바꾸지 않는다. Design이 정해지지 않은 사용자 경험을 임의로 확정하지 않는다. Public Client에 secret을 추가하지 않는다.
- 주요 산출물: Frontend 구현, consumer와 type 변경, contract 변경 요청, verification 결과와 남은 limitation.

### Backend Engineer

현재 Repository에는 별도 backend service가 없다. Backend Engineer는 현재 Architecture에서 Supabase 기반 data, authentication, authorization, storage와 server-side boundary를 담당한다. Architecture가 변경되면 이 범위를 재검토한다.

- 기본 Context: 관련 Product Requirement, 승인된 Design의 data requirement, `docs/engineering/architecture.md`, 승인된 Engineering contract와 Supabase 관련 code·configuration·type·migration.
- 책임: Data model과 lifecycle, authentication과 authorization boundary, RLS·policy·function·storage 접근 규칙, FE가 소비할 contract 설계 및 구현.
- 경계: 외부 Supabase 상태를 추정하지 않는다. Product lifecycle을 변경하거나 UI에 필요하지 않은 정보를 Public contract에 관성적으로 노출하지 않는다. 승인 없이 Production data나 외부 환경을 변경하지 않는다.
- 주요 산출물: Data 또는 service contract, schema와 authorization 변경, migration과 type, 외부 상태의 Confirmed / Unverified 구분 및 verification 결과.

### QA

QA는 구현이 기존 Requirement, 승인된 Design 및 Engineering contract를 충족하는지 독립적으로 검증한다.

- 기본 Context: `docs/product/requirements.md`, 관련 Design·Engineering 문서, 변경된 구현과 Repository가 제공하는 verification command.
- 책임: Requirement traceability, 정상·실패 흐름, Public/Private 및 authorization 경계 검증, Pass / Fail / Not Verified 구분과 재현 정보 보고.
- 경계: 새로운 Acceptance Criteria를 만들거나 발견한 문제를 직접 수정하지 않는다. 실행하지 않은 검증과 확인되지 않은 외부 상태를 통과 처리하지 않는다. 새로운 verification tooling을 임의로 설치하지 않는다.
- 주요 산출물: 검증 범위와 환경, 실행 방법, 결과, 실패 재현 정보와 residual risk.

## Agent 선택

| Task 성격 | 기본 참여 Agent |
|---|---|
| Product Scope 또는 Requirement 해석 | Product Owner |
| 화면 흐름 및 UI 상태 정의 | UX Designer, 필요한 경우 Product Owner |
| 화면별 data requirement 도출 | UX Designer, Frontend Engineer |
| Public/Admin data contract 설계 | Frontend Engineer, Backend Engineer |
| Frontend 구현 | Frontend Engineer |
| Data/Auth/Storage 구현 | Backend Engineer |
| Product 일관성 검토 | Product Owner |
| 구현 완료 검증 | QA |
| 여러 영역의 상충 조정 | Main Orchestrator, 필요한 경우 Human Lead |

## 표준 작업 흐름

1. Human Lead가 목표, 질문 또는 변경 요청을 전달한다.
2. Main Orchestrator가 `AGENTS.md`, `docs/README.md`, 관련 domain 문서, code와 configuration 순으로 필요한 Context만 확인한다.
3. 요청을 Product decision, UX design, Engineering design, implementation, verification 또는 documentation으로 분류한다.
4. 필요한 전문 Agent에 목표, 범위, 관련 Requirement, 승인된 결정, 변경 가능 범위와 기대 산출물을 전달한다.
5. Main Orchestrator가 결과의 Requirement 위반, 충돌, 가정, contract 변경과 누락을 검토한다.
6. 새로운 Product 행동이나 주요 UX·Architecture 결정은 Human Lead 승인 후 구현한다.
7. 일관된 구현 단위가 완성되면 QA가 독립적으로 검증한다.
8. Main Orchestrator가 결과, verification, 미검증 영역과 남은 risk를 통합해 보고한다.

## Handoff Contract

Agent 간 handoff에는 필요한 범위에서 다음 정보를 포함한다.

```text
Goal:
Scope:
Out of Scope:
Source of Truth:
Related Requirements:
Approved Decisions:
Current Evidence:
Result:
Files or Contracts Affected:
Verification:
Unresolved Questions:
Recommended Next Owner:
```

Acceptance Criteria를 handoff마다 복사하지 않고 관련 `REQ-XX`를 연결한다. 다음 Agent의 판단에 영향을 주는 정보는 생략하지 않는다.

## 병렬 작업과 파일 소유권

- 서로 독립적인 조사, Product와 Current State 교차 검토, 분리된 code 영역의 구현과 독립 review는 병렬 수행할 수 있다.
- Product decision 이후 UX 설계, 화면별 data requirement 이후 data contract, contract 이후 FE/BE 구현, 구현 이후 QA 검증처럼 결과 의존성이 있는 작업은 순차 수행한다.
- 동시에 실행되는 Agent는 같은 파일을 수정하지 않는다.
- 공통 type이나 cross-domain contract는 하나의 담당 Agent가 수정하고 다른 Agent는 필요한 변경을 제안한다.
- 병렬 작업을 시작하기 전에 예상 수정 범위와 handoff 지점을 확인한다.

## 승인 및 Escalation

다음 상황은 Main Orchestrator에게 보고하고, 기존 Source of Truth로 해결할 수 없으면 Human Lead의 결정을 받는다.

- Product Requirement가 둘 이상으로 해석될 수 있다.
- 승인된 문서끼리 충돌한다.
- Design에 없는 data 또는 사용자 행동이 필요하다.
- cross-domain contract나 authorization boundary가 달라진다.
- 새로운 dependency 또는 외부 service가 필요하다.
- Production, 외부 환경 또는 파괴적 data 변경이 필요하다.
- V1 Non-goal로 Scope가 확장될 가능성이 있다.

결정 요청에는 결정할 내용, 대안, 영향과 trade-off, 권장안 및 결정 전까지 중단되는 작업을 포함한다.

## Documentation 및 Source of Truth

| 정보 | Source of Truth |
|---|---|
| Repository 운영 및 Context routing | `AGENTS.md` |
| 실행 가능한 Agent 정의 | `.codex/agents/*.toml` |
| 전체 Orchestration 설명 | `docs/engineering/agent-orchestration.md` |
| Product 목표·Requirement·Backlog | `docs/product/` |
| UX와 UI 행동 | `docs/design/` |
| Architecture·contract·data·auth·deployment | `docs/engineering/` |
| 중요한 결정과 근거 | `docs/decisions/` |
| 실제 Current State | code 및 configuration |

Agent별 documentation directory를 만들거나 domain 지식을 Agent 설정에 복제하지 않는다. `.codex/agents/`는 역할의 실행 지침만 가지며, 장기 지식은 관련 domain 문서를 참조한다.

## Phase 3 적용 흐름

Phase 3은 다음 흐름을 기본으로 하되, 서로 연결된 Product slice 단위로 반복할 수 있다.

```text
Product Target 및 Requirements
            ↓
UX flow와 화면 상태 설계
            ↓
화면별 data requirement
            ↓
FE ↔ BE contract
            ↓
Data/Auth/Storage Engineering Design
            ↓
FE/BE 구현
            ↓
QA 검증
            ↓
Human Lead 수락
```

실제 slice와 실행 순서는 `docs/product/backlog.md`의 dependency와 Current State를 검토해 별도로 결정한다.
