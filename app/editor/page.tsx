"use client"
import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Resizer from 'react-image-file-resizer';

const QuillEditor = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

export default function Home() {
  const [content, setContent] = useState('');
  const [buttonText, setButtonText] = useState('Submit');

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

  const handleSubmit = async () => {
    const formData = {
      email: "ashiqfiroz08@gmail.com",
      description: content,  // Use content from the editor
      date: "31-07-2024",
      time: "17:30",
    };

    setButtonText("Submitting...");
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbz3q5tkr9joktYxANPmH7gevsqOVLC_quVE4TYAE5Gl/dev", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Form submitted successfully!'); // Display the popup on successful form submission
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setButtonText("Submit");
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image',
    'align', 'color',
    'code-block',
  ];

  return (
    <main>
      <div className="h-screen w-screen flex items-center flex-col bg-white">
        <span className='text-7xl text-gray-700'>Blog Writer</span>
        <div className="h-full w-[90vw]">
          <QuillEditor
            value={content}
            onChange={handleEditorChange}
            modules={modules}
            formats={formats}
            className="w-full h-[80%] mt-10 backdrop-blur-md text-black rounded-xl"
          />
        </div>
        
        <br /><br />
        <form action="https://script.google.com/macros/s/AKfycbz3q5tkr9joktYxANPmH7gevsqOVLC_quVE4TYAE5Gl/dev" method="post">
        <input type="text" name='email' className='bg-white text-black' placeholder='email' /><br />
        <input type="text" name='description' className='bg-white text-black'  placeholder='desc' /><br />
        <input type="text" name='date' className='bg-white text-black'  placeholder='date' /><br />
        <input type="text" name='time' className='bg-white text-black'  placeholder='time' /><br />
        <button type='submit' className='bg-black text-white'>submit</button><br /><br />
        </form>
      </div>
    </main>
  );
}
