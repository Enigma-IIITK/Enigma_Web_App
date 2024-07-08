import React from 'react';

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