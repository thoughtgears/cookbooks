import { useCallback, useEffect, useState } from 'react'

type ArticleIndex = {
  id: number
  path: string
}

type Article = {
  id: number
  path: string
  title: string
  author: string
  publishedDate: string
  tags: string[]
  content: string
}

const App = () => {
  const [articles, setArticles] = useState<ArticleIndex[]>([])
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true)
  const [isLoadingArticle, setIsLoadingArticle] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/articles')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: ArticleIndex[] = await response.json()
        setArticles(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(`Failed to fetch the list of articles: ${err.message}`)
        } else {
          setError('An unknown error occurred while fetching the article list.')
        }
        console.error(err)
      } finally {
        setIsLoadingList(false)
      }
    }

    fetchArticles()
  }, [])

  const handleArticleClick = useCallback(async (path: string) => {
    setIsLoadingArticle(true)
    setSelectedArticle(null) // Clear previous article
    setError(null)

    try {
      const response = await fetch(`/articles/${path}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: Article = await response.json()
      setSelectedArticle(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to fetch the article: ${path}. Error: ${err.message}`)
      } else {
        setError('An unknown error occurred while fetching the article.')
      }
      console.error(err)
    } finally {
      setIsLoadingArticle(false)
    }
  }, [])

  const ArticleContent = ({ article }: { article: Article }) => {
    // A simple pseudo-markdown parser
    const renderContent = (text: string) => {
      if (!text) return null
      return text.split('\n').map((line, index) => {
        if (line.startsWith('# ')) {
          return (
            <h1 key={index} className="mt-4 mb-2 text-3xl font-bold">
              {line.substring(2)}
            </h1>
          )
        }
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="mt-3 mb-1 text-2xl font-semibold">
              {line.substring(3)}
            </h2>
          )
        }
        if (line.trim().startsWith('- ')) {
          return (
            <li key={index} className="ml-6 list-disc">
              {line.substring(2)}
            </li>
          )
        }
        if (line.includes('```')) {
          return (
            <pre key={index} className="my-4 overflow-x-auto rounded-md bg-gray-800 p-4 text-white">
              <code>{line.replace(/```/g, '')}</code>
            </pre>
          )
        }
        return (
          <p key={index} className="my-2">
            {line}
          </p>
        )
      })
    }

    return (
      <article className="prose lg:prose-xl max-w-none rounded-lg bg-white p-6 shadow-lg md:p-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">{article.title}</h1>
        <div className="mb-4 text-sm text-gray-500">
          <span>By {article.author}</span> | <span>Published on {article.publishedDate}</span>
        </div>
        <div className="mb-6 flex flex-wrap gap-2">
          {article.tags &&
            article.tags.map((tag) => (
              <span key={tag} className="mr-2 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                {tag}
              </span>
            ))}
        </div>
        <div>{renderContent(article.content)}</div>
      </article>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <div className="container mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-center text-4xl font-bold text-gray-800 md:text-5xl">My Awesome Blog</h1>
          <p className="mt-2 text-center text-gray-600">Powered by React & Cloudflare</p>
        </header>

        {/* Article List Section */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">Articles</h2>
          {isLoadingList ? (
            <p>Loading articles...</p>
          ) : (
            <ul className="space-y-2">
              {articles.map((article) => (
                <li key={article.id}>
                  <button
                    onClick={() => handleArticleClick(article.path)}
                    className="w-full rounded-lg p-3 text-left text-blue-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {/* A simple title generator from the path */}
                    {article.path
                      .split('-')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Selected Article Display Section */}
        <main>
          {error && (
            <div className="relative rounded-lg border border-red-400 bg-red-100 px-4 py-3 text-red-700" role="alert">
              {error}
            </div>
          )}

          {isLoadingArticle ? (
            <div className="p-10 text-center">
              <p className="text-lg text-gray-600">Loading Article...</p>
            </div>
          ) : selectedArticle ? (
            <ArticleContent article={selectedArticle} />
          ) : (
            !isLoadingList && (
              <div className="rounded-lg bg-white p-10 text-center shadow-md">
                <p className="text-lg text-gray-500">Please select an article from the list above to read its content.</p>
              </div>
            )
          )}
        </main>
      </div>
    </div>
  )
}

export default App
