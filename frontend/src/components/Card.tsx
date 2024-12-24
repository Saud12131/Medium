
interface BlogcardProps {
    authorname: string,
    title: string,
    content: string,
    publisheddate: string,
    id: string
}

export default function Card({ authorname, title, content, publisheddate, id }: BlogcardProps) {
    return (
        <article className="max-w-xl rounded-lg border border-gray-200 bg-white p-5 hover:bg-gray-50">
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

        </article>
    )
}

export function Avatar({ authorname }: { authorname: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-10 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300 ">{authorname[0]}</span>
        </div>
    )
}

