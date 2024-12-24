import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../cofig';


interface Blog {
  "content": string,
  "title": string,
  "id": string,
  "author": {
    "name": string
  }
}
export default function useBlogs() {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog[]>([]);

  useEffect(() => {
    let token = localStorage.getItem('token');
    axios.get(`${BACKEND_URL}/api/v1/post/blogs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setBlog(response.data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blog,
  };
}