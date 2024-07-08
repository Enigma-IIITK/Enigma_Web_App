import React from 'react';

interface PageProps {
    params: {
        id: string;
    };
}

const Page: React.FC<PageProps> = ({ params }) => {
    const id = decodeURIComponent(params.id);
    return(
        <>
         <h1>Hello certificate {id}</h1>
        </>
    );
}

export default Page;