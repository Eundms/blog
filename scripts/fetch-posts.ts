import fs from 'fs'
import path from 'path'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

interface GithubFile {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string | null
  type: string
}

async function fetchPosts() {
  const repo = process.env.GITHUB_POSTS_REPO
  const branch = process.env.GITHUB_POSTS_BRANCH || 'main'
  const postsPath = process.env.GITHUB_POSTS_PATH || 'posts'

  if (!repo) {
    console.error('❌ GITHUB_POSTS_REPO is not set in .env')
    process.exit(1)
  }

  const [owner, repoName] = repo.split('/')

  console.log(`📥 Fetching posts from ${owner}/${repoName}/${postsPath}...`)

  try {
    // GitHub API로 파일 목록 가져오기
    const { data } = await octokit.repos.getContent({
      owner,
      repo: repoName,
      path: postsPath,
      ref: branch,
    })

    if (!Array.isArray(data)) {
      console.error('❌ Expected directory but got file')
      process.exit(1)
    }

    const mdFiles = data.filter((file: GithubFile) =>
      file.type === 'file' && file.name.endsWith('.md')
    )

    console.log(`📝 Found ${mdFiles.length} markdown files`)

    // content 디렉토리 생성
    const contentDir = path.join(process.cwd(), 'content', 'posts')
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true })
    }

    // 각 마크다운 파일 다운로드
    for (const file of mdFiles) {
      if (file.download_url) {
        console.log(`  ⬇️  Downloading ${file.name}...`)

        const response = await fetch(file.download_url)
        const content = await response.text()

        const filePath = path.join(contentDir, file.name)
        fs.writeFileSync(filePath, content, 'utf-8')

        console.log(`  ✅ Saved ${file.name}`)
      }
    }

    // 메타데이터 파일 생성
    const metadata = mdFiles.map((file: GithubFile) => ({
      filename: file.name,
      path: file.path,
      url: file.html_url,
    }))

    const metadataPath = path.join(contentDir, '_metadata.json')
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2))

    console.log(`\n✨ Successfully fetched ${mdFiles.length} posts!`)
  } catch (error) {
    console.error('❌ Error fetching posts:', error)
    process.exit(1)
  }
}

fetchPosts()
