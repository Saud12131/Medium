import { Link } from "react-router-dom";
interface BlogcardProps {
    authorname: string,
    title: string,
    content: string,
    publisheddate: string,
    id: string
}


interface ReccardProps {
    email: string,
    name: string,
    id: string,
}
export function Card({ authorname, title, content, publisheddate }: BlogcardProps) {
    return (
        <article className="max-w-xl rounded-lg border border-gray-200 bg-white p-5 hover:border-slate-300 ">
            <div className="flex items-center gap-2 mb-4">

                <Avatar authorname={authorname} />

                <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">{authorname}</span>
                    <span className="mx-1">·</span>
                    <time>{publisheddate}</time>
                </div>
            </div>

            <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{title}</h2>
            <p className="mb-4 text-gray-600 line-clamp-2">{content}</p>
            <p className="bg-">Read more....</p>
        </article>
    )
}

export function RecCard({ name, email, id }: ReccardProps) {
    return (
        <article className="max-w-xl rounded-lg border border-gray-400 bg-white p-5 hover:bg-gray-50 mb-7">
            <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                    <span className="mb-1 text-xl font-bold tracking-tight text-gray-900">{name}</span>
                </div>
            </div>
            <h2 className="m-3">{email}</h2>
            <Link to={`/user/${id}`}>
                <p className="ml-20 w-20 border-2 hover:border-gray-400 rounded-lg p-1 transition-all text-center">
                    Visit Folk
                </p>
            </Link>

        </article>
    )
}

export function Avatar({ authorname }: { authorname: string }) {
    return (
        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{authorname[0]}</span>
        </div>


    )
}

