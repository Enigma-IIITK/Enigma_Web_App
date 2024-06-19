import { Teko} from 'next/font/google'
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import NavBar2 from '../components/navbar2';

const teko = Teko({
    subsets: ['latin'],
    display: 'swap',
    weight: '700'
  });

const People = ()=>{
    return (
        <>
        <NavBar2/>
        
        
        <section>
            <br /><br />
            <center>
                <h1 className='text-white text-3xl'>Patrons</h1>
            </center>
            <div className="container py-16 mx-auto px-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <div className="col-span-1 row-span-1 relative">
                    <img
                            src="/patrons/director.jpeg"
                            alt="Your Image"
                            className="w-full h-[40vh] object-cover rounded-md"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                            <p className={`${teko.className} text-white`}>DIRECTOR IIIT Kottayam</p>
                            <p className="text-white">Dr. Rajiv V. Dharaskar</p>
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-1 row-span-1 relative">
                        <img
                            src="/patrons/registrar.jpeg"
                            alt="Your Image"
                            className="w-full h-[40vh] object-cover rounded-md"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                            <p className={`${teko.className} text-white`}>REGISTRAR IIIT Kottyam</p>
                            <p className="text-white">Dr. M. Radhakrishnan</p>
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-1 row-span-1 relative">
                    <img
                            src="/patrons/mohanan.jpg"
                            alt="Your Image"
                            className="w-full h-[40vh] object-cover rounded-md"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                            <p className={`${teko.className} text-white`}>PIC-Academics IIIT Kottayam</p>
                            <p className="text-white">Prof P. Mohanan</p>
                        </div>
                    </div>
                    

                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 py-8">
                    
                    <div className="col-span-1 lg:col-span-1 row-span-1 relative">
                        <img
                            src="/patrons/ebin.jpeg"
                            alt="Your Image"
                            className="w-full h-[40vh] object-cover rounded-md"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                            <p className={`${teko.className} text-white`}>Associate Dean IIIT Kottayam</p>
                            <p className="text-white">Dr. Ebin Deni Raj</p>
                        </div>
                    </div> 
                    <div className="col-span-1 lg:col-span-1 row-span-1 relative">
                        <img
                            src="/patrons/lincy.jpeg"
                            alt="Your Image"
                            className="w-full h-[40vh] object-cover rounded-md"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                            <p className={`${teko.className} text-white`}>Assistant Professor IIIT Kottayam</p>
                            <p className="text-white">Dr. Rubell Marion Lincy G</p>
                        </div>
                    </div> 
                    <div className="col-span-1 lg:col-span-1 row-span-1 relative">
                        <img
                            src="/patrons/sahoo.jpg"
                            alt="Your Image"
                            className="w-full h-[40vh] object-cover rounded-md"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                            <p className={`${teko.className} text-white`}>HOD (Computer Science & Engineering-1) IIIT Kottayam</p>
                            <p className="text-white">Dr. Jayakrushna Sahoo</p>
                        </div>
                    </div> 
                    <div className="col-span-1 lg:col-span-1 row-span-1 relative">
                        <img
                            src="/patrons/cinu.jpg"
                            alt="Your Image"
                            className="w-full h-[40vh] object-cover rounded-md"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                            <p className={`${teko.className} text-white`}>Assistant Professor IIIT Kottayam</p>
                            <p className="text-white">Dr. Cinu C Kiliroor</p>
                        </div>
                    </div> 
                </div>
            </div>
        </section>

        <br /><br />
        <Footer/>
        </>
    );
}

export default People;