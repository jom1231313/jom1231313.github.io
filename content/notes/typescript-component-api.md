---
title: 'TypeScript로 잘못된 버튼 조합 줄이기'
description: '링크와 동작 버튼의 역할을 타입으로 구분해 재사용 컴포넌트의 사용법을 명확하게 만듭니다.'
date: '2026-10-23'
category: '프론트엔드'
tags: ['TypeScript', 'React', '컴포넌트']
readingTime: 4
featured: false
artwork: 'typescript'
sample: true
---

## 가능한 상태를 먼저 정의하기

재사용 컴포넌트에 선택 속성이 계속 늘어나면 어떤 조합이 유효한지 알기 어려워집니다. `href`와 클릭 동작을 모두 허용하는 버튼은 페이지 이동인지 작업 실행인지 사용자가 직접 해석해야 합니다. 이때 속성을 역할별로 나누면 구현과 호출부가 함께 읽기 쉬워집니다.

판별 유니온은 공통 속성을 유지하면서 서로 다른 역할을 표현하는 방법입니다. 아래 예시는 `kind` 값에 따라 링크 주소 또는 실행 함수를 요구합니다. 한 역할에서 쓰지 않는 속성은 `never`로 막아 의도가 섞인 호출을 타입 검사에서 발견할 수 있도록 합니다.

```tsx
type ActionProps = { label: string } & (
  | { kind: 'link'; href: string; onClick?: never }
  | { kind: 'button'; onClick: () => void; href?: never }
)

function Action(props: ActionProps) {
  if (props.kind === 'link') {
    return <a href={props.href}>{props.label}</a>
  }

  return <button type="button" onClick={props.onClick}>{props.label}</button>
}
```

모든 속성을 미리 추상화할 필요는 없습니다. 실제 사용 사례를 모은 뒤 공통되는 부분을 추출하면 API가 과하게 커지는 것을 줄일 수 있습니다. 버튼의 비활성 상태, 로딩 중 표시, 아이콘 이름도 화면에서 필요한 상황이 생겼을 때 추가하는 편이 명확합니다.

타입 검사가 접근성이나 실행 중 데이터의 유효성까지 보장하는 것은 아닙니다. 외부 입력은 별도 검증하고, 링크에는 목적지가 이해되는 이름을 제공해야 합니다. 컴포넌트 설명에는 가능한 호출 예시와 각 역할의 차이를 함께 남깁니다.

- [ ] 이동에는 링크, 작업 실행에는 버튼을 사용하는가?
- [ ] 함께 사용할 수 없는 속성을 타입으로 구분했는가?
- [ ] 의미 없는 선택 속성을 추가하지 않았는가?

이 글은 스타터에 포함된 예시 글입니다.
