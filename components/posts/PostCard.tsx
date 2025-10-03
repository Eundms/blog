"use client"

import { forwardRef } from "react"
import { MessageSquare } from "lucide-react"
import { CATEGORY_LABELS } from '@/lib/constants/messages'
import Link from "next/link"

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

interface PostCardProps {
  post: Post
  tagFilters: string[]
  handleTagClick: (tag: string) => void
}

export const PostCard = forwardRef<HTMLAnchorElement, PostCardProps>(
  ({ post, tagFilters, handleTagClick }, ref) => {
  const getCategoryLabel = (category: string) => {
    return CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] || category
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ko-KR", { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  return (
    <Link
      href={`/posts/${post.id}`}
      className="group block py-10 border-b-2 border-gray-400 dark:border-gray-600 last:border-0 hover:bg-white dark:hover:bg-gray-800 transition-colors px-4 -mx-4"
      ref={ref}
    >
      <article className="space-y-4">
        {/* 제목 */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h2>

        {/* 날짜 & 카테고리 */}
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            {formatDate(post.createdAt)}
          </span>
          <span className="text-gray-400">·</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {getCategoryLabel(post.category)}
          </span>
        </div>

        {/* 설명 */}
        <p className="text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
          {stripHtml(post.content)}
        </p>

        {/* 하단: 댓글, 태그 */}
        <div className="flex items-center justify-between pt-2">
          {/* 댓글 */}
          <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm">{post.comments.length}</span>
          </div>

          {/* 태그 */}
          {post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.slice(0, 3).map((tag, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleTagClick(tag)
                  }}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    tagFilters.includes(tag)
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
})

PostCard.displayName = "PostCard"
