"use client"
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/AuthContext';
import { LayoutDashboard, Users, Group, Dices, TicketCheck, Newspaper, UserRoundPlus, LogOut } from 'lucide-react';
import { getData } from '../firebase/addData';
import dynamic from 'next/dynamic';

const BlogTable = dynamic(() => import('../components/BlogList'), { ssr: false });
const Profile = dynamic(() => import('../components/profile'), { ssr: false });
const BlogEditor = dynamic(() => import('../components/editBlog'), { ssr: false });

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("Profile");
    const [user_email, setUserEmail] = useState("")
    const [user_name, setUserName] = useState("")

    const [year, setYear] = useState("2024");

    useEffect(() => {
        setIsSidebarOpen(!window.matchMedia("(min-width: 768px)").matches);
    }, []);

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    
    const handleCreateBlog = () => {
        setActiveTab('Create_Blog');
    };

    const handleLogout = async () => {
        setActiveTab("Logout")
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                setLoading(false);
                console.log(user);
                try {
                    const userData = await getData("users", user.uid);
                    
                    setUserEmail(userData.result.email);
                    console.log("Member:", userData.result.member);
                    console.log("Admin:", userData.result.admin);

                    if(userData.result.admin){
                        router.push('/dashboard')
                    }
                    else if(userData.result.member){
                        router.push('/members')
                    }
                    
                } catch (error) {
                    console.error("Error fetching user data: ", error);
                }
            } else {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        // bg-[url('/random/dashboard_bg.png')]
        <div className=" bg-cover">
            <button
                onClick={toggleSidebar}
                aria-controls="sidebar-multi-level-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside
                id="sidebar-multi-level-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100"
                                aria-controls="dropdown-example"
                                onClick={toggleSidebar}
                            >
                                <span className="ms-3">Enigma</span>
                            </button>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => setActiveTab("Profile")}
                                className={`flex items-center p-2 rounded-lg hover:bg-gray-800 group ${activeTab === "Profile" ? "bg-gray-900" : "text-gray-900"}`}
                            >
                                <Users />
                                <span className="ms-3">Profile</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => setActiveTab("Your Blogs")}
                                className={`flex items-center p-2 rounded-lg hover:bg-gray-800 group ${activeTab === "Your Blogs" ? "bg-gray-900" : "text-gray-900"}`}
                            >
                                <Newspaper />
                                <span className="ms-3">Your Blogs</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={handleLogout}
                                className={`flex items-center p-2 rounded-lg hover:bg-gray-800 group ${activeTab === "Logout" ? "bg-gray-900" : "text-gray-900"}`}
                            >
                                <LogOut />
                                <span className="ms-3">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                {activeTab == "Profile" ? <Profile /> : null}
                {activeTab == "Your Blogs" ? 
                 <>
                 <button
                   onClick={handleCreateBlog}
                   className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                 >
                   Create
                 </button>
                 <BlogTable author_email={user_email}/>
               </>
                : null}
                {activeTab == "Create_Blog" ? <BlogEditor author_email={user_email}/> : null}
                {activeTab == "View_Blog" ? <BlogEditor author_email={user_email}/> : null}
            </div>
        </div>
    );
}
