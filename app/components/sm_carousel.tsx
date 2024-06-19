// components/ImageStack.tsx

import Image from 'next/image';

const images = [
  { src: '/events/inaguration.jpeg', text: "Club Inauguration" },
  { src: '/events/poster_hackathon.png', text: "AI Hackathon" },
  { src: '/events/session1.png', text: "O TO HERO IN REINFORCEMENT LEARNING" },
  { src: '/events/session2.png', text: "DEEP DIVE INTO NEAT AI" },
  { src:  '/events/session3.png', text: "HANDS ON XPERIENCE" },
];

const ImageStack: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      {images.map((image, index) => (
        <div key={index} className="relative w-full h-64 mb-4">
          <Image
            src={image.src}
            alt={`Image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
          {/* <div className="absolute inset-0 flex items-center justify-start">
        <br />
            <span className="text-white font-bold text-2xl"><b>{image.text}</b></span>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default ImageStack;
