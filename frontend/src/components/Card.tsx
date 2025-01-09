import { Link } from "react-router-dom";
interface BlogcardProps {
    authorname: string,
    title: string,
    content: string,
    publisheddate: string,
    id: string
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
interface RecCardProps {
  name: string;
  email: string;
  id: string;
}

export function RecCard({ name, email, id }: RecCardProps) {
  return (
    <article className="w-full rounded-lg border border-gray-300 bg-white p-4 hover:bg-gray-50 mb-4 shadow-sm">
      <div className="flex flex-col gap-2">
        <div className="flex items-center text-sm text-gray-600">
          <span className="text-lg font-semibold text-gray-900">{name}</span>
        </div>
        <h2 className="text-sm text-gray-600">{email}</h2>
        <Link to={`/user/${id}`} className="self-end">
          <p className="border border-gray-300 hover:border-gray-400 rounded-lg px-3 py-1 transition-all text-center text-sm text-blue-600 hover:bg-blue-50">
            Visit Profile
          </p>
        </Link>
      </div>
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

