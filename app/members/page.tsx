"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/AuthContext'; // Adjust the path to your firebase.js file
import { LayoutDashboard, Users, Group, Dices, Newspaper, LogOut } from 'lucide-react';

import TeamGrid from '../components/EditTeam';
import EventHead from '../components/EditEvents';
import BlogTable from '../components/BlogList';
import Profile from '../components/profile';
import BlogEditor from '../components/editBlog';
import { getData } from '../firebase/addData';

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("Profile");
    const [year, setYear] = useState("2024");

    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.matchMedia("(min-width: 768px)").matches);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                setLoading(false);

                try {
                    const userData = await getData("users", user.uid);
                    setUserEmail(userData.result.email);
                    if (userData.result.admin) {
                        router.push('/dashboard');
                    }
                } catch (error) {
                    console.error("Error fetching user data: ", error);
                }
            } else {
                router.push('/login');
            }
        });

        return () => {
            window.removeEventListener("resize", handleResize);
            unsubscribe();
        };
    }, [router]);

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleCreateBlog = () => {
        setActiveTab('Create_Blog');
    };

    const handleLogout = async () => {
        setActiveTab("Logout");
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

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
                                <span className="ms-3">Enigma</span><span className="ms-3">Memeber</span>
                            </button>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => setActiveTab("Dashboard")}
                                className={`flex items-center p-2 rounded-lg hover:bg-gray-800 group ${activeTab === "Dashboard" ? "bg-gray-900" : "text-gray-900"}`}
                            >
                                <LayoutDashboard />
                                <span className="ms-3">Dashboard</span>
                            </a>
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
                                onClick={() => setActiveTab("Team")}
                                className={`flex items-center p-2 rounded-lg hover:bg-gray-800 group ${activeTab === "Team" ? "bg-gray-900" : "text-gray-900"}`}
                            >
                                <Group />
                                <span className="ms-3">Team</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => setActiveTab("Events")}
                                className={`flex items-center p-2 rounded-lg hover:bg-gray-800 group ${activeTab === "Events" ? "bg-gray-900" : "text-gray-900"}`}
                            >
                                <Dices />
                                <span className="ms-3">Events</span>
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
            {
                    activeTab == "Dashboard" ?

                        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center justify-center h-24 rounded bg-gray-50">
                                    <p className="text-2xl text-gray-400">+</p>
                                </div>
                                <div className="flex items-center justify-center h-24 rounded bg-gray-50">
                                    <p className="text-2xl text-gray-400">+</p>
                                </div>
                                <div className="flex items-center justify-center h-24 rounded bg-gray-50">
                                    <p className="text-2xl text-gray-400">+</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center justify-center rounded bg-gray-50 h-28">
                                    <p className="text-2xl text-gray-400">+</p>
                                </div>
                                <div className="flex items-center justify-center rounded bg-gray-50 h-28">
                                    <p className="text-2xl text-gray-400">+</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50">
                                <p className="text-2xl text-gray-400">+</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center justify-center rounded bg-gray-50 h-28">
                                    <p className="text-2xl text-gray-400">+</p>
                                </div>
                                <div className="flex items-center justify-center rounded bg-gray-50 h-28">
                                    <p className="text-2xl text-gray-400">+</p>
                                </div>
                            </div>
                        </div>
                        : null}
                {activeTab == "Profile" ? <Profile /> : null}
                {activeTab == "Team" ?
                    <div className='h-max'>
                        <div className="flex justify-center mt-8">

                            <select
                                id="year"
                                value={year}
                                onChange={handleYearChange}
                                className="border rounded px-4 py-2"
                            >
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                {/* Add more years as needed */}
                            </select>
                        </div>
                        <br />
                        <TeamGrid year={year} />
                    </div>
                    : null}

                {activeTab == "Events" ? <EventHead /> : null}
                {activeTab == "Your Blogs" ? 
                 <>
                 <button
                   onClick={handleCreateBlog}
                   className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                 >
                   Create
                 </button>
                 <BlogTable author_email={userEmail}/>
               </>
                : null}
                {activeTab == "Create_Blog" ? <BlogEditor author_email={userEmail}/> : null}
                {activeTab == "View_Blog" ? <BlogEditor author_email={userEmail}/> : null}
            </div>
        </div>
    );
}
