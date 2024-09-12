"use client";
import React, { useState, useEffect } from 'react';
import NavBar2 from '../components/navbar2';
import Footer from '../components/footer';
import { topBlogs } from '../firebase/addData'; // Assuming topBlogs is a fetch function.

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [topics, setTopics] = useState([]);

  // Fetch top blogs and store in topics
  useEffect(() => {
    const fetchTopBlogs = async () => {
      const { result, error } = await topBlogs();
      if (error) {
        console.error("Failed to fetch top blogs:", error);
      } else {
        // Group blogs into categories based on their type or topic (assuming result has topic information)
        const groupedTopics = result.reduce((acc, blog) => {
          const topic = blog.topic || 'Other'; // Default to 'Other' if topic is missing
          if (!acc[topic]) {
            acc[topic] = { name: topic, blogs: [] };
          }
          acc[topic].blogs.push({
            title: blog.title,
            description: blog.description,
            views: blog.views,
          });
          return acc;
        }, {});

        // Convert object back to array
        setTopics(Object.values(groupedTopics));
      }
    };

    fetchTopBlogs();
  }, []);

  const filteredTopics = topics.map(topic => ({
    ...topic,
    blogs: topic.blogs.filter(blog =>
      (blog.title && blog.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (blog.description && blog.description.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
  }));



  return (
    <>
      <NavBar2 />
      <div className="min-h-screen bg-cover p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl text-gray-100 mb-6 font-serif">Explore Topics</h1>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredTopics.map(topic => (
            <div key={topic.name} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-100 mb-4">{topic.name}</h2>
              <div className="space-y-4">
                {topic.blogs.map(blog => (
                  <div key={blog.title} className="relative p-4 bg-black bg-opacity-60 rounded-lg shadow">
                    <a href={`/blog/${encodeURIComponent(blog.title)}`} className="text-xl font-semibold text-gray-300">
                      {blog.title}
                    </a>

                    <p className="text-gray-100">{blog.description}</p>
                    <div className="absolute top-4 right-4 text-gray-400">{blog.views} views</div>
                  </div>
                ))}
                {topic.blogs.length === 0 && <p className="text-gray-200">No blogs found under this topic.</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
