/*
export default function Page(){
    return(
        <>
        <h1>Hello blog topics</h1>
        </>
    );
}
*/
"use client";
import React, { useState } from 'react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const topics = [
    {
      name: 'Technology',
      blogs: [
        { title: 'The Future of AI', description: 'Exploring the advancements in artificial intelligence.', views:100 },
        { title: 'Blockchain Basics', description: 'Understanding the fundamentals of blockchain technology.', views:30 },
      ],
    },
    {
      name: 'Health',
      blogs: [
        { title: 'Healthy Living Tips', description: 'Tips for maintaining a healthy lifestyle.', views:90 },
        { title: 'Mental Health Awareness', description: 'Raising awareness about mental health.', views:100 },
      ],
    },
    {
      name: 'Travel',
      blogs: [
        { title: 'Top 10 Destinations', description: 'Must-visit places around the world.', views:93 },
        { title: 'Travel on a Budget', description: 'How to travel without breaking the bank.', views:40 },
      ],
    },
  ];

  const filteredTopics = topics.map(topic => ({
    ...topic,
    blogs: topic.blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="min-h-screen bg-cover p-8"
    style={{ backgroundImage: "url('random/background.jpg')" }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl text-gray-100 mb-6 font-serif">Trending Blogs</h1>
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
                  <h3 className="text-xl font-semibold text-gray-300">{blog.title}</h3>
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
  );
};

export default Blog;