"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const db = getFirestore();

export const addNews = async (news: { header: string; body: string; links: string; date: string }) => {
    try {
        const newsRef = doc(db, "Enigma_News", "news");
        await setDoc(newsRef, { news }, { merge: true });
        return true;
    } catch (error) {
        console.error("Error adding news: ", error);
        return false;
    }
};

const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

const modules = {
  toolbar: [
    [{ 'font': ['Arial', 'Times New Roman', 'Helvetica', 'Courier New', 'Georgia'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'size': ['small', 'normal', 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ]
};

const formats = [
  'font', 'header', 'size',
  'bold', 'italic', 'underline', 'strike',
  'align', 'color', 'background',
  'list', 'bullet',
  'blockquote', 'code-block',
  'link', 'image'
];

const NewsEditor: React.FC = () => {
  const [header, setHeader] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [links, setLinks] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const handleEditorChange = (newContent: string) => {
    setBody(newContent);
  };

  const handleSubmit = async () => {
    try {
      if (body ) {
        let header = ""
        let links = ""
        const formattedDate = new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const news = {
          header,
          body,
          links,
          date: formattedDate,
        };
        const result = await addNews(news);
        if (result) {
          toast.success('Newsletter sent successfully!', {
            position: "top-right",
            autoClose: 3000
          });
          setHeader("");
          setLinks("");
        } else {
          toast.error('Failed to send newsletter', {
            position: "top-right",
            autoClose: 3000
          });
        }
      } else {
        toast.error('Please enter newsletter content', {
          position: "top-right",
          autoClose: 3000
        });
      }
    } catch (error) {
      toast.error('Failed to send newsletter', {
        position: "top-right",
        autoClose: 3000
      });
    }
  };

  return (
    <main
      className={`min-h-screen flex flex-col items-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="w-full max-w-4xl px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-purple-500">Write on whats new in Enigma</h1>
          {/* <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button> */}
        </div>

        <input
          type="text"
          placeholder="Header"
          value={header || ""}
          onChange={(e) => setHeader(e.target.value)}
          className="w-full mb-4 px-4 hidden py-2 border rounded text-black bg-gray-50 border-purple-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Relevant Links (comma separated)"
          value={links || ""}
          onChange={(e) => setLinks(e.target.value)}
          className="w-full mb-4 px-4 hidden py-2 border rounded text-black bg-gray-50 border-purple-500 focus:outline-none"
        />

        <div className="flex flex-col space-y-6 w-full max-w-4xl mx-auto p-4">
          <div className="relative h-[20vh] md:h-[50vh] lg:h-[60vh]">
            <QuillEditor
              value={body}
              onChange={handleEditorChange}
              modules={modules}
              formats={formats}
              className="h-full bg-white rounded-md text-black shadow-md"
              theme="snow"
            />
          </div>
          <ToastContainer />
        </div>
      </div>
      <div className="py-4 items-center w-44">
      <button
            onClick={handleSubmit}
            className="w-full md:w-1/2 mx-auto py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 text-center font-semibold shadow-md"
          >
            Submit
          </button>
      </div>
    </main>
  );
};

export default NewsEditor;