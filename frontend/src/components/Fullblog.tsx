import { BlogTypes } from "../hooks/BlogHook"
import Appbar from "./Appbar"
import { Avatar } from "./Card"

export default function FullBlog({ blog }: { blog: BlogTypes }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar />
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <article className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              {blog.title}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Posted on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div className="prose prose-lg max-w-none">
              {blog.content}
            </div>
          </div>
        </article>

        <aside className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Author</h2>
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <Avatar authorname={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {blog.author.name || "Anonymous"}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Crafting compelling narratives that captivate and inspire readers.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

