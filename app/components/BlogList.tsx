"use client"
import React, { useState,useEffect } from 'react';
import firebase_app from "../firebase/config";
import { getFirestore, getDocs, query, where,collection, } from "firebase/firestore";


const db = getFirestore(firebase_app);

interface Blog {
    id: string;
    title: string;
    topic: string;
    views: number;
  }
  
  interface BlogTableProps {
    author_email: string;
  }

const BlogTable: React.FC<BlogTableProps> = ({ author_email }) => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
  
    useEffect(() => {
      const fetchBlogs = async () => {
        const q = author_email != ""? query(collection(db, 'Blogs'), where('author', '==', author_email)) :query(collection(db, 'Blogs'));
        const querySnapshot = await getDocs(q);
        const blogsData: Blog[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Blog[];
        setBlogs(blogsData);
      };
  
      fetchBlogs();
    }, [author_email]);
  
    return (
      <div className='min-h-[100vh]'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Topic</th>
                <th scope="col" className="px-6 py-3">Views</th>
                <th scope="col" className="px-6 py-3"><span className="sr-only">Action</span></th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog.id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{blog.title}</th>
                  <td className="px-6 py-4">{blog.topic}</td>
                  <td className="px-6 py-4">{blog.views}</td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 hover:underline">Action</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default BlogTable;