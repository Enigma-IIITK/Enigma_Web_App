"use client";

import React, { useState, useEffect } from 'react';
import { getBlog } from '../../firebase/addData';

interface PageProps {
  params: {
    topic: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const topic = decodeURIComponent(params.topic);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const { result, error } = await getBlog(topic);
      if (error) {
        setError("Failed to fetch content. Please try again later.");
      } else if (result.length > 0) {
        setContent(result[0].content);
      } else {
        setContent("No content available for this topic.");
      }
    };

    fetchContent();
  }, [topic]);

  return (
    <div className="min-h-screen md:flex-col">
      <main className="flex-grow bg-white mx-4 md:mx-8 my-8 md:my-16 rounded shadow">
        <article>
          <div className="mb-8">
            <span className="top-0 left-0 bg-black text-white py-1 px-3 rounded-br-lg">Featured Post</span>
            <img
              src="random/background.jpg"
              alt="Featured Post"
              className="w-full h-auto rounded"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-black font-serif text-center">This is a Standard Post</h1>
          <p className="text-gray-600 mb-4 text-center">
            Published by <a href="#" className="text-blue-500 text-center">Ben Sibley</a> on <a href="#" className="text-blue-500">November 13, 2016</a>
          </p>
          <div
            className="text-gray-800 text-center p-8"
            dangerouslySetInnerHTML={{ __html: content || "Loading content..." }}
          />
        </article>
        <h1 className="text-3xl font-bold mb-4">{topic}</h1>
        <p className="mb-6">This is a detailed post about {topic}.</p>
        <CommentSection />
      </main>
      <div className="bg-pink-950 bg-opacity-80 text-white p-8 w-full">
        <div className="text-center mb-8">
          <img
            src="/path-to-author-image.jpg"
            alt="Author"
            className="rounded-full mx-auto mb-4 w-24 h-24"
          />
          <h2 className="text-2xl font-bold">Author</h2>
          <p className="text-gray-400">Optimally designed for reading</p>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Connect</h3>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-gray-400">[Icon]</a>
            <a href="#" className="hover:text-gray-400">[Icon]</a>
            <a href="#" className="hover:text-gray-400">[Icon]</a>
          </div>
        </div>
        <nav>
          <ul>
            <li className="mb-4"><a href="#" className="hover:text-gray-400">Home</a></li>
            <li className="mb-4"><a href="#" className="hover:text-gray-400">About</a></li>
            <li className="mb-4"><a href="#" className="hover:text-gray-400">Sample Page</a></li>
            <li className="mb-4"><a href="#" className="hover:text-gray-400">Contact</a></li>
          </ul>
        </nav>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">About Author</h3>
          <p className="text-gray-400">
            Author is designed for publishers who want readers. That&apos;s why Author is fast, responsive, accessibility-ready, and...
          </p>
        </div>
      </div>
    </div>
  );
};

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<{ comment: string }[]>([]);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setComments([...comments, { comment }]);
    setComment('');
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2 text p-2">
          <label htmlFor="comment" className="p-2 block text-sm font-medium text-gray-700">Comments</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-white mt-1 content-normal block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            required
          ></textarea>
        </div>
        <div className="p-2">
          <button
            type="submit"
            className="mt-2 px-2 py-1 bg-pink-950 text-white rounded-md hover:bg-pink-800">
            Submit
          </button>
        </div>
      </form>
      <div>
        {comments.map((comment, index) => (
          <div key={index} className="mb-4">
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
