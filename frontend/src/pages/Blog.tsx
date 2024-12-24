
import { Link } from 'react-router-dom';
import Appbar from '../components/Appbar'
import Card from '../components/Card'
import { useBlogs } from '../hooks/BlogHook';
import { Spinner } from '../components/spinner.tsx';

export default function Blog() {

  const { loading, blog } = useBlogs();
  if (loading) {
    return (
      <div>
        <Appbar />
        <div className='flex items-center justify-center h-screen'>
          <Spinner />
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="navbar">
        <Appbar />
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor">
        {blog.map(post =>
          <Link to={`${post.id}`}>
            <Card
              id={post.id}
              authorname={post.author.name || "anonymous"}
              publisheddate="12 Dec 2024"
              title={post.title}
              content={post.content}
              key={post.id}

            />
          </Link>

        )}
      </div>

    </div>
  );


}
