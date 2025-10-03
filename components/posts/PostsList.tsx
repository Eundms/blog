"use client"

import { FileText } from "lucide-react"
import { PostCard } from "./PostCard"
import { STATUS_MESSAGES, POSTS_PAGE_MESSAGES } from '@/lib/constants/messages'

interface Post {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  author: {
    name: string
    image: string
    email: string
  }
  createdAt: string
  comments: any[]
  likes?: string[]
  pinned?: boolean
}

interface PostsListProps {
  posts: Post[]
  displayedPosts: Post[]
  session: any
  tagFilters: string[]
  handleTagClick: (tag: string) => void
  loading: boolean
  hasMore: boolean
  lastPostElementRef: (node: HTMLElement | null) => void
}

export function PostsList({
  posts,
  displayedPosts,
  session,
  tagFilters,
  handleTagClick,
  loading,
  hasMore,
  lastPostElementRef
}: PostsListProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {STATUS_MESSAGES.NO_POSTS}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {POSTS_PAGE_MESSAGES.NO_POSTS_DESC}
        </p>
      </div>
    )
  }

  if (displayedPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {STATUS_MESSAGES.NO_SEARCH_RESULTS}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {POSTS_PAGE_MESSAGES.NO_RESULTS_DESC}
        </p>
      </div>
    )
  }

  return (
    <div>
      {displayedPosts.map((post, index) => (
        <PostCard
          key={post.id}
          post={post}
          tagFilters={tagFilters}
          handleTagClick={handleTagClick}
          ref={index === displayedPosts.length - 1 ? lastPostElementRef : null}
        />
      ))}

      {/* 로딩 인디케이터 */}
      {loading && (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}

      {/* 더 이상 로드할 게시글이 없을 때 */}
      {!hasMore && displayedPosts.length > 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            ✨ 모든 게시글을 확인했습니다
          </p>
        </div>
      )}
    </div>
  )
}
