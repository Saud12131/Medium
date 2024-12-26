import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../cofig';
import { Spinner } from '../components/spinner';
import { useParams } from 'react-router-dom';


export interface usertypes {
  "name": string,
  "email": string,
  "id": string,
  "post": {
    "content": string,
    "title": string,
    "id": string,
  }

}


export default function UserInfo() {
  const [loading, setLoading] = useState(true);
  const [userinfo, setuserinfo] = useState<usertypes[]>([]);//check you should give it array or object
  let { id } = useParams();
  useEffect(() => {
    let token = localStorage.getItem('token');
    axios.get(`${BACKEND_URL}/api/v1/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setuserinfo(response.data.userDetails);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }
  return (
    <div>
      {userinfo.name}
    </div>
  )
}
