import Appbar from '../components/Appbar'
import axios from "axios";
import { BACKEND_URL } from "../cofig";
import { useNavigate } from "react-router-dom";
import React, { ChangeEvent, useState } from "react";
import { Spinner } from '../components/spinner';
export const Create = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (title && description){

        
            try {
                const response = await axios.post(`${BACKEND_URL}/api/v1/post/create`, {
                    title,
                    content: description
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status == 200) {
                    navigate("/blogs")
                }
            } catch (err) {
                alert("something broked");
                setLoading(false);
                console.log(err);

            }
        }else{
            alert("please fill all the fields");
            setLoading(false);
        }
    }

    return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" required className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />

                <TextEditor onChange={(e) => {
                    setDescription(e.target.value);

                }} />
                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                    disabled={loading}
                    onClick={handelSubmit}
                >
                    <h2 className='flex justify-center items-center'>
                        {loading ? <Spinner /> : 'Post Blog'}
                    </h2>
                </button>
            </div>
        </div>
    </div>
}


function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
                <div className="my-2 bg-white rounded-b-lg w-full">
                    <label className="sr-only">Publish post</label>
                    <textarea onChange={onChange} required id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..."  />
                </div>
            </div>
        </div>
    </div>

}