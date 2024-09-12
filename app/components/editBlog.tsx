"use client";
import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Resizer from 'react-image-file-resizer';
import { addBlog } from '../firebase/addData';   // Adjust the path as needed

const QuillEditor = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

export default function BlogEditor({author_email}) {

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [author, setAuthor] = useState(author_email);
  console.log(author)

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    console.log(newContent);
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const width = parseInt(prompt('Enter width:'), 10);
      const height = parseInt(prompt('Enter height:'), 10);

      if (file && !isNaN(width) && !isNaN(height)) {
        try {
          Resizer.imageFileResizer(
            file,
            width,
            height,
            'JPEG',
            80,
            0,
            (uri) => {
              const editor = document.querySelector('.ql-editor');
              const range = document.getSelection().getRangeAt(0);
              const img = document.createElement('img');
              img.src = ""+uri;
              range.insertNode(img);
            },
            'base64'
          );
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("Invalid image dimensions.");
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        [{ align: [] }],
        [{ color: [] }],
        ['code-block'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler
      }
    }
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image',
    'align', 'color',
    'code-block',
  ];

  const handleSubmit = async () => {
    if (title && topic  && content) {
      const formattedDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const blog = {
        title:title,
        topic:topic,
        author:author,
        content:content,
        views : 0,
        status : "ok", //hidden means banned, ok means no issue
        date: formattedDate,
      };
      let result = await addBlog(blog);
      if(result){
      alert('Blog submitted successfully!');
      setTitle('');
      setTopic('');
      setAuthor('');
      setContent('');
      }
      else{
      alert('Error Occured during upload');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <main>
      <div className="h-screen flex items-center flex-col bg-white relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className='mt-10'>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full bg-white border-black text-black"
        />
        <input 
          type="text" 
          placeholder="Topic" 
          value={topic} 
          onChange={(e) => setTopic(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-1/2 border-black bg-white text-black"
        />
       
        </div>
        
        <div className="h-full w-[60vw]">
          <QuillEditor
            value={content}
            onChange={handleEditorChange}
            modules={modules}
            formats={formats}
            className="w-full h-[80%] mt-10 backdrop-blur-md text-black rounded-xl"
          />
        </div>
        <button 
          onClick={handleSubmit} 
          className="mt-4 mb-8 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </div>
    </main>
  );
}
