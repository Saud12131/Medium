
import Fullblog from '../components/Fullblog';
import { useftechBlog } from '../hooks/BlogHook'
import { useParams } from 'react-router-dom';
import Appbar from '../components/Appbar';
export default function BlogInfo() {
  const { id } = useParams();
  const { loading, blog } = useftechBlog({ id: id || "" });

  if (loading) {
    return (
      <div>
        <div>
          <Appbar />
        </div>
        ...loading
      </div>
    )
  }

  return (
    <div>
      <div>
      </div>
      <Fullblog blog={blog || { content: "", title: "", id: "", author: { name: "" } }} />

    </div>
  )
}
