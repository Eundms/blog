"use client"

import { POSTS_PAGE_MESSAGES } from '@/lib/constants/messages'
import Link from "next/link"

interface PostsHeaderProps {
  session: any
}

export function PostsHeader({ session }: PostsHeaderProps) {
  return (
    <header className="border-b-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center border-2 border-gray-900 dark:border-gray-100">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Eundms</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">{POSTS_PAGE_MESSAGES.BOARD_TITLE}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}