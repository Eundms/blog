"use client"

import { Badge } from "@/components/ui/badge"
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Pin } from "lucide-react"
import { CATEGORY_LABELS } from "@/lib/constants/messages"
import { useSearchParams, useRouter } from "next/navigation"

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

interface PostContentProps {
  post: Post
  session: any
  renderMentions: (text: string) => React.ReactNode
}

export function PostContent({ post, session, renderMentions }: PostContentProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const getCategoryLabel = (category: string) => {
    return CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] || category
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      question: "bg-blue-100 text-blue-800",
      tip: "bg-green-100 text-green-800",
      discussion: "bg-purple-100 text-purple-800",
      news: "bg-orange-100 text-orange-800",
      tutorial: "bg-indigo-100 text-indigo-800",
      showcase: "bg-pink-100 text-pink-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <>
      <CardHeader>
        <div className="space-y-4">
          {/* Title */}
          <CardTitle className="text-3xl md:text-4xl font-bold text-balance">{post.title}</CardTitle>

          {/* Date and Category */}
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-gray-400">·</span>
            <div className="flex items-center gap-2">
              {post.pinned && (
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  <Pin className="w-3 h-3 mr-1" />
                  고정
                </Badge>
              )}
              <Badge className={getCategoryColor(post.category)}>{getCategoryLabel(post.category)}</Badge>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <button
                  key={index}
                  className="text-xs px-2 py-1 rounded text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  onClick={() => {
                    const currentTagParam = searchParams.get('tag')
                    const currentTags = currentTagParam ? currentTagParam.split(',') : []

                    if (!currentTags.includes(tag)) {
                      const newTags = [...currentTags, tag]
                      router.push(`/posts?tag=${encodeURIComponent(newTags.join(','))}`)
                    } else {
                      router.push(`/posts?tag=${encodeURIComponent(tag)}`)
                    }
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="prose prose-lg prose-gray dark:prose-invert max-w-none prose-headings:font-semibold prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-gray-100"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </CardContent>
    </>
  )
}