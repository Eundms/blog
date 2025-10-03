'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

export function GiscusComments() {
  const { theme } = useTheme()

  return (
    <Giscus
      id="comments"
      repo={process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID || ''}
      category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'Announcements'}
      categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || ''}
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={theme === 'dark' ? 'dark' : 'light_high_contrast'}
      lang="ko"
      loading="lazy"
    />
  )
}
