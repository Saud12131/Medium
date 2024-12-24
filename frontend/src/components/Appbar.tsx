import React from 'react'
import { Avatar } from './Card'

export default function Appbar() {
    return (
        <div className='border-b flex items-center justify-between px-10 py-3'>
            <div className='flex-grow text-center'>
                <h2 className='font-bold'>Medium</h2>
            </div>
            <div>
                <Avatar authorname='saud' />
            </div>
        </div>

    )
}
