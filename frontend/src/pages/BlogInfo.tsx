
import Fullblog from '../components/Fullblog';
import { useftechBlog } from '../hooks/BlogHook'
import { useParams } from 'react-router-dom';
import Appbar from '../components/Appbar';
import { Spinner } from '../components/spinner';
export default function BlogInfo() {
  const { id } = useParams();
  const { loading, blog } = useftechBlog({ id: id || "" });
  
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
      <div>
      </div>
      <Fullblog blog={blog || { content: "", title: "", id: "", author: { name: "" } }} />

    </div>
  )
}
