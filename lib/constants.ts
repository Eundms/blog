import { CATEGORY_COLORS } from '@/lib/config/categories'

// 페이지네이션 설정
export const PAGINATION = {
  POSTS_PER_PAGE: 10,
  USERS_PER_PAGE: 5,
  COMMENTS_PER_PAGE: 20,
  DEFAULT_PAGE: 1,
} as const

// 제한 설정
export const LIMITS = {
  POST_TITLE_MAX: 200,
  POST_CONTENT_MAX: 10000,
  COMMENT_MAX: 1000,
  BIO_MAX: 200,
  TAGS_MAX: 10,
  TAG_LENGTH_MAX: 50,
} as const

// 카테고리 설정 (lib/config/categories.ts에서 가져옴)
export const POST_CATEGORIES = CATEGORY_COLORS

// 정렬 옵션
export const SORT_OPTIONS = {
  NEWEST: { key: 'createdAt', order: 'desc', label: '최신순' },
  OLDEST: { key: 'createdAt', order: 'asc', label: '오래된순' },
  MOST_LIKED: { key: 'likes', order: 'desc', label: '좋아요순' },
  MOST_COMMENTED: { key: 'comments', order: 'desc', label: '댓글순' },
} as const

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  POSTS: 'posts',
  USER_BIOS: 'userBios',
  USER_FOLLOWS: 'userFollows',
  USER_PREFERENCES: 'userPreferences',
  DRAFT_POSTS: 'draftPosts',
} as const

// API 엔드포인트 (향후 백엔드 연동 시 사용)
export const API_ENDPOINTS = {
  POSTS: '/api/posts',
  USERS: '/api/users',
  COMMENTS: '/api/comments',
  AUTH: '/api/auth',
  FOLLOWS: '/api/follows',
  SEARCH: '/api/search',
} as const

// 에러 메시지
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 오류가 발생했습니다.',
  UNAUTHORIZED: '로그인이 필요합니다.',
  FORBIDDEN: '권한이 없습니다.',
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  VALIDATION_ERROR: '입력 값이 올바르지 않습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다.',
  POST_NOT_FOUND: '게시글을 찾을 수 없습니다.',
  USER_NOT_FOUND: '사용자를 찾을 수 없습니다.',
  COMMENT_NOT_FOUND: '댓글을 찾을 수 없습니다.',
} as const

// 성공 메시지
export const SUCCESS_MESSAGES = {
  POST_CREATED: '게시글이 성공적으로 작성되었습니다.',
  POST_UPDATED: '게시글이 성공적으로 수정되었습니다.',
  POST_DELETED: '게시글이 성공적으로 삭제되었습니다.',
  COMMENT_CREATED: '댓글이 성공적으로 작성되었습니다.',
  COMMENT_UPDATED: '댓글이 성공적으로 수정되었습니다.',
  COMMENT_DELETED: '댓글이 성공적으로 삭제되었습니다.',
  PROFILE_UPDATED: '프로필이 성공적으로 업데이트되었습니다.',
  FOLLOW_SUCCESS: '팔로우했습니다.',
  UNFOLLOW_SUCCESS: '언팔로우했습니다.',
} as const

// 디바운스 설정
export const DEBOUNCE_DELAYS = {
  SEARCH: 300,
  AUTOSAVE: 1000,
  TYPING: 500,
} as const

// 기본 아바타 이미지
export const DEFAULT_AVATAR = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'

// 개발 모드에서 사용할 더미 데이터 설정
export const DEV_CONFIG = {
  USE_DUMMY_DATA: process.env.NODE_ENV === 'development',
  DUMMY_USERS_COUNT: 20,
  DUMMY_POSTS_COUNT: 50,
  DUMMY_COMMENTS_COUNT: 100,
} as const