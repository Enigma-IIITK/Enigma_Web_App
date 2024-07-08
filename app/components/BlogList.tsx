import React, { useState } from 'react';


const BlogTable: React.FC = () => {


    return (
        <div className='min-h-[100vh] '>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-10 rounded-md">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Blog Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Topic
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Author
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Views
                            </th>

                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                World of Ai
                            </th>
                            <td className="px-6 py-4">
                                General AI
                            </td>
                            <td className="px-6 py-4">
                                ashiqfioz08@gmail.com
                            </td>
                            <td className="px-6 py-4">
                                10
                            </td>

                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 hover:underline">Action</a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                World of Ai
                            </th>
                            <td className="px-6 py-4">
                                General AI
                            </td>
                            <td className="px-6 py-4">
                                ashiqfioz08@gmail.com
                            </td>
                            <td className="px-6 py-4">
                                10
                            </td>

                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 hover:underline">Action</a>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
};



export default BlogTable;

