import React from 'react';

interface ImageCardProps {
    imageSrc: string;
    textContent: string;
   
}

const ImageCard: React.FC<ImageCardProps> = ({ imageSrc, textContent }) => {
  return (
    <div className="relative overflow-hidden w-full sm:w-1/2  p-2">
      <div className="group relative overflow-hidden rounded-md">
        <img
          src={imageSrc}
          alt="Your Image"
          className="w-full  object-cover rounded-md transition-transform transform group-hover:blur-sm"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-white">{textContent}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
