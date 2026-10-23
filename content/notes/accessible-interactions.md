---
title: '키보드로도 자연스럽게 쓰는 인터랙션'
description: '버튼의 의미와 포커스, 상태 안내를 함께 설계해 입력 방식에 관계없이 사용할 수 있는 화면을 만듭니다.'
date: '2026-10-23'
category: '프론트엔드'
tags: ['접근성', 'React', '사용자 경험']
readingTime: 4
featured: false
artwork: 'accessibility'
sample: true
---

## 클릭할 수 있는 것의 기본 동작

클릭 이벤트가 있다고 해서 모든 요소가 버튼처럼 동작하는 것은 아닙니다. 기본 `button`은 키보드 활성화와 포커스 이동 같은 동작을 제공합니다. 단순한 작업 실행이라면 `div`에 역할과 키 이벤트를 덧붙이기보다 의미에 맞는 HTML을 먼저 선택하는 것이 관리하기 쉽습니다.

접고 펼치는 영역에서는 현재 상태를 보조 기술에도 전달해야 합니다. 트리거에 `aria-expanded`를 설정하고 `aria-controls`로 대상 영역을 연결하면 관계가 명확해집니다. 아래 예시처럼 닫힌 콘텐츠에 `hidden`을 사용하면 보이지 않는 내부 링크에 포커스가 이동하는 문제도 피할 수 있습니다.

```tsx
'use client'

import { useId, useState } from 'react'

export function Details() {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return <>
    <button type="button" aria-expanded={open} aria-controls={panelId}
      onClick={() => setOpen(!open)}>지원 범위 보기</button>
    <div id={panelId} hidden={!open}>지원 범위를 여기에 안내합니다.</div>
  </>
}
```

포커스 표시도 디자인의 일부로 다뤄야 합니다. 기본 외곽선을 제거했다면 충분히 눈에 띄는 대체 표시를 제공하고, 어두운 배경과 밝은 배경에서 모두 확인합니다. 모달처럼 초점 이동이 복잡한 인터랙션은 검증된 구현을 사용하되 닫힌 뒤 트리거로 돌아가는 동작까지 점검합니다.

확인할 때는 마우스를 잠시 내려놓고 처음부터 페이지를 사용해 봅니다. Tab으로 모든 동작에 도달할 수 있는지, 현재 위치가 보이는지, 버튼 이름만으로 결과를 예상할 수 있는지가 좋은 출발점입니다.

- [ ] 키보드로 실행하고 종료할 수 있는가?
- [ ] 포커스가 항상 보이고 순서가 자연스러운가?
- [ ] 열린 상태와 닫힌 상태가 올바르게 안내되는가?

이 글은 스타터에 포함된 예시 글입니다.
