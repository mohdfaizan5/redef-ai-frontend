import TodoManager from '@/components/todo-manager'
import { connectDB } from '@/utils/db'
import mongoose from 'mongoose'
import React from 'react'
export const dynamic = 'force-dynamic'; // or 'force-static'

const page = async () => {
    await connectDB()

    // @ts-ignore
    const db = mongoose.connection.client.db('redef')
    const todos = await db.collection('todo').find({}).limit(10).toArray();


    return (
        <div className='min-h-screen p-4'>
            <h1 className='text-2xl font-bold mb-6'>Tasks</h1>
            <TodoManager todos={todos} />
        </div>
    )
}

export default page