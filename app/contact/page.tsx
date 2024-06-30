import '../contact.css';
import React, { ReactNode } from "react";

// Import components
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import NavBar2 from '../components/navbar2';
import { SignupFormDemo } from '../components/contactform';
import { BentoGrid, BentoGridItem } from '../components/ui/bento-grid1';

// Contact component
const Contact = () => {
    return (
        <>
            <NavBar2 />
            <div className='p-2'>

            </div>
            <div className='grid grid-cols-1 lg:grid-cols-4'>
                <div className='p-8 col-span-2 lg:flex hidden sm:block'>
                    <img src="/random/mascot_3.jpg" className="max-w-4xl rounded-md h-[55vh] mx-auto md:auto-rows-[20rem]" />
                    {/* <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
                        {items.map((item, i) => (
                            <BentoGridItem
                                key={i}
                                title={item.title}
                                description={item.description}
                                header={item.header}
                                className={item.className}
                                icon=""
                            />
                        ))}
                    </BentoGrid> */}
                </div>
                <div className="lg:w-[400] lg:col-span-2 p-2">
                    <SignupFormDemo />
                </div>
            </div>
            <Footer />
        </>
    );
}


  const items = [
    {
        title: "",
        description: "",
        header: <div className="text-7xl  tracking-[.25em] py-28 px-4 bg-[url('/random/mascot_1.jpg')]"><b>EN</b></div>,
        className: "md:col-span-1",
       
      },
    {
        title: "",
        description: "",
        header: <span className="text-7xl tracking-[.25em] py-28 px-4 bg-[url('/random/mascot_2.jpg')]"><b>IG</b></span>,
        className: "md:col-span-1",
    },
    {
        title: "",
        description: "",
        header: <span className="text-7xl tracking-[.25em] py-28 bg-[url('/random/mascot_3.jpg')]"><b>MA</b></span>,
        className: "md:col-span-1",
    },
   
  ];
  

export default Contact;
