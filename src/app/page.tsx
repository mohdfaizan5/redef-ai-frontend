import { connectDB } from '@/utils/db'
import mongoose from 'mongoose'
import { todo } from 'node:test'
import React from 'react'

const page = async () => {
  await connectDB()
  const db = mongoose.connection.db; // 👈 Get raw database
  
  // const collection = db.collection('redef'); // 👈 Your existing collection name

  // const todos = await collection.find({}).toArray();


  // const collection = mongoose.connection

  // const todos = await collection.collection('redef').find({}).toArray()
  // const c = await db.listCollections()
  // const d = await collection.listDatabases()


  // const data = await collection.find({}).toArray()
  console.log("\n\n\n ---------");
  // console.log("\n\n\n ++++++", todos);
  // console.log(d);

  const c = await mongoose.connection.listDatabases()

  console.log(c);
  // const data = await mongoose.connection.db
  // ?.collection('redef')
  // ?.find({})
  // ?.toArray()

  // @ts-ignore
  const redefDb = mongoose.connection.client.db('redef');
  const todos = await redefDb.collection('todo').find({}).limit(10).toArray();

  // .collection('todo').find({}).toArray()
  console.log(todos);

  // await dbConnect()
  // // mongoose.noCh
  // const db = mongoose.model('redef', {}, "todo");
  // // const collection = db.('redef'); // raw access to 'items' collection

  // const todos = await db.find({})
  // console.log(todos);



  return (
    <div className='flex flex-col items-center mt-10 min-h-screen'>
      {/* page */}
      {/* {JSON.stringify(data, null, 2)} */}
      {/* <pre>{JSON.stringify(todos, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(c, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(d, null, 2)}</pre> */}
      <div>
        {todos.map((todo: any) => (
          <div className='space-x-2 flex items-center' key={todo._id}>
            <input type="checkbox" checked={todo.isCompleted} readOnly />
            {/* <p>Status: {todo.isCompleted ? 'Completed' : 'Pending'}</p> */}
            <p className='text-lg'>{todo.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
