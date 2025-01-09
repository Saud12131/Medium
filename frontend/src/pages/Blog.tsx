import { Link } from 'react-router-dom';
import Appbar from '../components/Appbar';
import { Card, RecCard } from '../components/Card';
import { useBlogs } from '../hooks/BlogHook';
import { Spinner } from '../components/spinner';
import RecomdHook from '../hooks/RecomdHook';

export default function Blog() {
  const { loading, blog, error } = useBlogs();
  const { recommendation } = RecomdHook();

  if (error) {
    return (
      <div>
        <Appbar />
        <div className="flex items-center justify-center h-screen">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Appbar />

      <div className="flex-grow flex">
        {/* Left Section: Blogs */}
        <div className="w-full lg:w-3/4 p-4 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            {blog.map((post) => (
              <Link to={`${post.id}`} key={post.id} className="block mb-6">
                <Card
                  id={post.id}
                  authorname={post.author.name || 'anonymous'}
                  publisheddate="12 Dec 2024"
                  title={post.title}
                  content={post.content}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section: Recommendations (visible only on desktop) */}
        <div className="hidden lg:block w-1/4 p-4 bg-gray-100 border-l border-gray-300">
          <h3 className='font-semibold text-lg mb-4'>You Might Know</h3>
          <div className="space-y-4">
            {recommendation.map((sugg) => (
              <RecCard
                key={sugg.id}
                id={sugg.id}
                name={sugg.name}
                email={sugg.email}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

