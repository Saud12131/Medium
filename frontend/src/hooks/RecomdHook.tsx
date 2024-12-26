import { useState, useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../cofig'

export interface RecomdTypes {
    "id": string,
    "email": string,
    "name": string,

}

export default function RecomdHook() {
    let [loading, setLoading] = useState(true);
    let [recommendation, setrecommendation] = useState<RecomdTypes[]>([]);

    useEffect(() => {
        try {
            let token = localStorage.getItem('token');
            axios.get(`${BACKEND_URL}/api/v1/user/allusers`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(
                (response) => {
                    setrecommendation(response.data.AllUsers);
                    setLoading(false);
                    
                })

        } catch (err) {
            alert("something went wrong");
            console.log(err);
        }
    })

    return {
        loading,
        recommendation
    }
}
