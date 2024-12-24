import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../cofig';


export interface BlogTypes {
  "content": string,
  "title": string,
  "id": string,
  "author": {
    "name": string
  }
}


export function useBlogs() {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogTypes[]>([]);

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

export function useftechBlog({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState();

  useEffect(() => {
    let token = localStorage.getItem('token');
    axios.get(`${BACKEND_URL}/api/v1/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setBlog(response.data.post);
        
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        console.log(blog);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blog,
  };
}

export default {
  useBlogs,
  useftechBlog
}