# 블로그 설정 가이드

## 1. Giscus 댓글 시스템 설정

### 1.1 GitHub Discussions 활성화

1. GitHub 레포지토리로 이동
2. Settings > General > Features
3. "Discussions" 체크박스 활성화

### 1.2 Giscus 앱 설치

1. https://giscus.app 방문
2. 레포지토리 입력 (예: `username/blog`)
3. Discussion 카테고리 선택 (General 권장)
4. 생성된 설정값 복사

### 1.3 환경 변수 설정

`.env.local` 파일에 다음 값 추가:

```bash
# Giscus 설정
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
```

## 2. GitHub 마크다운 포스트 설정

### 2.1 포스트 레포지토리 준비

마크다운 파일을 저장할 GitHub 레포지토리가 필요합니다.

**레포지토리 구조 예시:**
```
your-posts-repo/
├── posts/
│   ├── 2024-01-01-first-post.md
│   ├── 2024-01-02-second-post.md
│   └── ...
```

### 2.2 마크다운 파일 형식

각 마크다운 파일은 frontmatter를 포함해야 합니다:

```markdown
---
title: "첫 번째 포스트"
date: "2024-01-01"
category: "kubernetes"
tags: ["kubernetes", "docker"]
description: "Kubernetes에 대한 소개"
---

# 본문 내용

여기에 포스트 내용을 작성합니다...
```

### 2.3 환경 변수 설정

`.env.local` 파일에 다음 값 추가:

```bash
# GitHub 포스트 설정
GITHUB_POSTS_REPO=your-username/your-posts-repo
GITHUB_POSTS_BRANCH=main
GITHUB_POSTS_PATH=posts

# (선택사항) GitHub Personal Access Token
# rate limit 회피를 위해 권장
GITHUB_TOKEN=ghp_your_personal_access_token
```

### 2.4 GitHub Personal Access Token 생성 (선택사항)

1. GitHub Settings > Developer settings > Personal access tokens
2. "Generate new token (classic)" 클릭
3. 권한: `public_repo` 체크
4. 토큰 생성 및 복사
5. `.env.local`의 `GITHUB_TOKEN`에 추가

## 3. 카테고리 설정

`lib/config/categories.ts` 파일에서 카테고리를 관리합니다.

자세한 내용은 `lib/config/README.md` 참고.

## 4. 빌드 및 배포

### 로컬 테스트

```bash
# 포스트 가져오기
npm run fetch-posts

# 개발 서버 실행
npm run dev
```

### 빌드

```bash
# 빌드 (자동으로 포스트를 가져옵니다)
npm run build
```

### Vercel 배포

1. Vercel에 프로젝트 연결
2. Environment Variables에 `.env.local`의 모든 변수 추가
3. Deploy

### GitHub Pages 배포

1. `.github/workflows/deploy.yml` 파일 생성 (아래 참고)
2. Repository Settings > Pages > Source: GitHub Actions 선택

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Fetch posts
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITHUB_POSTS_REPO: ${{ secrets.GITHUB_POSTS_REPO }}
          GITHUB_POSTS_BRANCH: main
          GITHUB_POSTS_PATH: posts
        run: npm run fetch-posts

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

## 5. 문제 해결

### 포스트가 보이지 않을 때

1. `.env.local` 설정 확인
2. `npm run fetch-posts` 실행
3. `content/posts/` 디렉토리에 파일이 있는지 확인

### Giscus 댓글이 보이지 않을 때

1. GitHub Discussions가 활성화되어 있는지 확인
2. `.env.local`의 Giscus 설정값 확인
3. 브라우저 콘솔에서 에러 확인
