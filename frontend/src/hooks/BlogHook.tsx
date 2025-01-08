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
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let token = localStorage.getItem('token');
    if (!token) {
      setError('You need to log in to access this page.');
      setLoading(false);
      return;
    }
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
        if (error.response && error.response.status === 401) {
          setError('You need to log in to access this page.');
        } else {
          setError('Failed to fetch blogs. Please try again later.');
        }
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blog,
    error,
  };
}

export function useftechBlog({ id }: { id: string }): { loading: boolean; blog: BlogTypes | null } {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogTypes | null>(null);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      setLoading(false);
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBlog(response.data.post);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blog:', error);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
}


export default {
  useBlogs,
  useftechBlog
}