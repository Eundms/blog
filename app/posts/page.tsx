"use client"

import { useSession } from "next-auth/react"
import { PostsHeader } from "@/components/posts/PostsHeader"
import { PostsFilters } from "@/components/posts/PostsFilters"
import { PostsList } from "@/components/posts/PostsList"
import { usePostsData } from "@/hooks/usePostsData"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"

export default function PostsPage() {
  const { data: session } = useSession()

  const {
    posts,
    sortedPosts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    tagFilters,
    allTags,
    handleTagClick
  } = usePostsData()

  const {
    displayedPosts,
    loading,
    hasMore,
    lastPostElementRef
  } = useInfiniteScroll({ posts: sortedPosts })

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
      <PostsHeader session={session} />

      <div className="container mx-auto px-4 py-8">
        <PostsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          allTags={allTags}
          tagFilters={tagFilters}
          handleTagClick={handleTagClick}
        />

        <div className="space-y-6">
          <PostsList
            posts={posts}
            displayedPosts={displayedPosts}
            session={session}
            tagFilters={tagFilters}
            handleTagClick={handleTagClick}
            loading={loading}
            hasMore={hasMore}
            lastPostElementRef={lastPostElementRef}
          />
        </div>
      </div>
    </div>
  )
}
