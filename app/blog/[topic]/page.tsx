/*import React from 'react';

interface PageProps {
    params: {
        topic: string;
    };
}

const Page: React.FC<PageProps> = ({ params }) => {
    const topic = decodeURIComponent(params.topic);
    return(
        <>
         <h1>Hello {topic}</h1>
        </>
    );
}

export default Page;
*/

"use client"; 

import React, { useState } from 'react';

interface PageProps {
  params: {
    topic: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const topic = decodeURIComponent(params.topic);
  
  return (
    <div className="min-h-screen md:flex-col">
      

      {/* Main Content */}
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
          <p className="text-gray-800 text-center p-8">
          Flomping grastly, the borkins wuzzle frandily under the glimshack. Dristing plokers,
          quorped and spindly, flark with untrokable merrithe. Zeegles spraflin, zorging bloff
          the marbit chrans. Under the plenwid sky, fardrips plisk and quetshle
          in mirtay breefs. Ranting skloogers morkle the flindig zaps, plorking unsightly bliffles.
          Thrandips grunder and floshpurt around the quormious blerts, while the sniddly
          glippets sark in treeshly bloff. 
              With norkling brill, the crumpled frints zork their plidst into the grashly blunb. Graliforting
          under the snikled blonks, zooglers grimsh and wirtle through the frisping blats. The derpfish fliggled in
          krapulous bans while zorking treely plonts. Hunder the borkles, flindor crisks and snidly jorps
          quill the tranting blurb. Gleeful snorps zirk and plath among the drongy fleems. With snizzled
          marvles, the brissling jorps flomple around the blanty preefs. Blunking quarf, they 
          brast through the zoodled granks, flinderin with mirtful zopes. Worzling crans, plaffing zink with 

          </p>
        </article>
        <h1 className="text-3xl font-bold mb-4">{topic}</h1>
            <p className="mb-6">This is a detailed post about {topic}.</p>
            <CommentSection />
      </main>
      {/* Author details */}
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
          <h3 className="text-xl font-semibold mb-4 ">Connect</h3>
          <div className="flex justify-center space-x-4">
            {/* Add links to social media */}
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
            Author is designed for publishers who want readers. That's why Author is fast, responsive, accessibility-ready, and...
          </p>
        </div>
      </div>

    </div>
  );
}
const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<{comment: string }[]>([]);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setComments([...comments, {comment }]);
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

/*const Page: React.FC<PageProps> = ({ params }) => {
  const topic = decodeURIComponent(params.topic);
  return (
      <>
          <h1 className="text-3xl font-bold mb-4">{topic}</h1>
          <p className="mb-6">This is a detailed post about {topic}.</p>
          <CommentSection />
      </>
  );
}*/
export default Page;
