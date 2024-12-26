import { Link } from 'react-router-dom';
import Appbar from '../components/Appbar';
import { Card, RecCard } from '../components/Card';
import { useBlogs } from '../hooks/BlogHook';
import { Spinner } from '../components/spinner';
import RecomdHook from '../hooks/RecomdHook';

export default function Blog() {
  const { loading, blog } = useBlogs();
  const { recommendation } = RecomdHook();
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
    <div>
      <Appbar />

      <div className="flex h-screen">
        {/* Left Section: Blogs */}
        <div className="flex-3 w-3/4 p-4 overflow-y-auto flex justify-center content-center">
          <div className="grid grid-cols-1 gap-6 ">
            {blog.map((post) => (
              <Link to={`${post.id}`} key={post.id}>
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

        {/* Right Section: Recommendations */}
        <div className="flex-1 w-1/4 bg-slate-50 p-4 overflow-y-auto">
          <h3 className='font-medium mb-2'>You Might Know</h3>
          {recommendation.map((sugg) => (
            <RecCard
              id={sugg.id}
              name={sugg.name}
              email={sugg.email}
              key={sugg.id}
            />

          ))}
        </div>
      </div>
    </div>
  );
}
