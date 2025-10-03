/**
 * 카테고리 설정 파일
 *
 * 이 파일에서 카테고리를 추가/수정/삭제할 수 있습니다.
 *
 * 각 카테고리는 다음 형식으로 정의됩니다:
 * {
 *   key: 'category-key',        // 시스템에서 사용할 고유 키 (영문, 소문자, 하이픈)
 *   label: '카테고리 이름',      // 화면에 표시될 이름
 *   color: 'bg-...',           // Tailwind CSS 클래스
 *   description: '설명'         // 카테고리 설명
 * }
 */

export interface Category {
  key: string
  label: string
  color: string
  description: string
}

// 여기에 카테고리를 추가/수정/삭제하세요
export const CATEGORIES: Category[] = [
  {
    key: 'kubernetes',
    label: 'Kubernetes',
    color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
    description: 'Kubernetes 관련 글'
  },
  {
    key: 'openstack',
    label: 'OpenStack',
    color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
    description: 'OpenStack 관련 글'
  },
  {
    key: 'golang',
    label: 'Go',
    color: 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-400 dark:border-cyan-800',
    description: 'Go 언어 관련 글'
  },
  {
    key: 'python',
    label: 'Python',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800',
    description: 'Python 관련 글'
  },
  {
    key: 'devops',
    label: 'DevOps',
    color: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
    description: 'DevOps 및 인프라 관련 글'
  },
  {
    key: 'cloud',
    label: 'Cloud',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800',
    description: '클라우드 관련 글'
  },
  {
    key: 'other',
    label: '기타',
    color: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800',
    description: '기타 주제'
  },
]

// 카테고리 key로 카테고리 정보 가져오기
export function getCategoryByKey(key: string): Category | undefined {
  return CATEGORIES.find(cat => cat.key === key)
}

// 카테고리 label 형식으로 변환 (기존 코드 호환용)
export const CATEGORY_LABELS = CATEGORIES.reduce((acc, cat) => {
  acc[cat.key] = cat.label
  return acc
}, {} as Record<string, string>)

// 카테고리 색상 맵핑 (기존 코드 호환용)
export const CATEGORY_COLORS = CATEGORIES.reduce((acc, cat) => {
  acc[cat.key] = {
    label: cat.label,
    color: cat.color,
    description: cat.description
  }
  return acc
}, {} as Record<string, { label: string; color: string; description: string }>)
