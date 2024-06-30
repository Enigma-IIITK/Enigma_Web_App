import Carousel from "./carousel";


export default function EventHeader() {
    return (
        <>
            <div className="px-10">
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-4 lg:col-span-2 py-10">
                        <span className="tracking-[1.2rem] text-3xl lg:text-6xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                            PREVIOUS <br /> <br /> EVENTS
                        </span>

                    </div>
                    <div className="col-span-4 lg:col-span-2 items-center justify-center">
                        {/* <img src='/events/session1.png' className="rounded-md h-[50vh] w-[40vh]" alt="" /> */}
                        <Carousel/>
                    </div>
                </div>
            </div>
        </>
    );
}