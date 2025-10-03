# 카테고리 설정 가이드

블로그의 카테고리는 `lib/config/categories.ts` 파일에서 관리됩니다.

## 카테고리 추가하기

`categories.ts` 파일의 `CATEGORIES` 배열에 새로운 카테고리를 추가하세요:

```typescript
{
  key: 'react',                    // 시스템에서 사용할 고유 키
  label: 'React',                  // 화면에 표시될 이름
  color: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800',
  description: 'React 관련 글'     // 카테고리 설명
}
```

### 컬러 옵션

Tailwind CSS 색상을 사용합니다. 사용 가능한 색상:

- **Blue**: `bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800`
- **Red**: `bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800`
- **Green**: `bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800`
- **Yellow**: `bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800`
- **Purple**: `bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800`
- **Pink**: `bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/20 dark:text-pink-400 dark:border-pink-800`
- **Indigo**: `bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800`
- **Cyan**: `bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-400 dark:border-cyan-800`
- **Orange**: `bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800`
- **Gray**: `bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800`

## 카테고리 수정하기

`CATEGORIES` 배열에서 수정할 카테고리를 찾아 값을 변경하세요.

## 카테고리 삭제하기

`CATEGORIES` 배열에서 해당 카테고리 객체를 제거하세요.

## 주의사항

- `key` 값은 영문 소문자와 하이픈(-)만 사용하세요
- `key` 값은 고유해야 합니다 (중복 불가)
- 기존 게시글이 사용 중인 카테고리를 삭제하면 해당 게시글에서 카테고리가 표시되지 않을 수 있습니다
