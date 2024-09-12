"use client"
import React, { useState, useEffect } from 'react';
import { getBlog } from '../../firebase/addData';
import 'react-quill/dist/quill.snow.css';
import NavBar2 from '../../components/navbar2';
import Footer from '../../components/footer';

const BlogPost = ({ params }) => {
  const topic = decodeURIComponent(params.topic);
  const [postData, setPostData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      const { result, error } = await getBlog(topic);
      if (error) {
        setError("Failed to fetch content. Please try again later.");
      } else if (result.length > 0) {
        setPostData(result[0]);
      } else {
        setError("No content available for this topic.");
      }
    };

    fetchContent();
  }, [topic]);

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  if (!postData) {
    return <div className="text-center mt-8">
      <div className="flex justify-center items-center">
            <div className="loader">
              <svg viewBox="0 0 80 80">
                <circle r="32" cy="40" cx="40" id="test"></circle>
              </svg>
            </div>

            <div className="loader triangle">
              <svg viewBox="0 0 86 80">
                <polygon points="43 8 79 72 7 72"></polygon>
              </svg>
            </div>

            <div className="loader">
              <svg viewBox="0 0 80 80">
                <rect height="64" width="64" y="8" x="8"></rect>
              </svg>
            </div>

          </div>
    </div>;
  }

  return (
    <>
    <NavBar2/>
    <main className="min-h-screen pt-8 pb-16 lg:pt-16 lg:pb-24  antialiased bg-black">
      <div className="flex justify-center px-4 mx-auto max-w-screen-xl">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <h1 className="text-3xl sm:text-3xl font-extrabold leading-tight text-gray-900 lg:mb-4 lg:text-5xl dark:text-white">
              {postData.title}
            </h1>

            {/* Author and date now below the title */}
            <address className="flex flex-col sm:flex-row items-start sm:items-center mb-6 not-italic">
              
              <div className="text-sm text-gray-900 dark:text-white">
                <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400">Author <span className='text-white'>{postData.author}</span></p>
                
                <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400">Views {postData.views}</p>
              </div>
            </address>
          </header>

          <div 
            className="prose max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />

          
        </article>
      </div>
    </main>
    <Footer/>
    </>
  );
};

export default BlogPost;
