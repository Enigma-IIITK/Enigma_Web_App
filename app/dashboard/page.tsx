"use client";

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/AuthContext'; // Adjust the path to your firebase.js file
import { LayoutDashboard, Users, Group, Dices, TicketCheck, Newspaper, UserRoundPlus, LogOut } from 'lucide-react';
import MemberTable from '../components/Members';
import TeamGrid from '../components/EditTeam';
import EventHead from '../components/EditEvents';
import BlogTable from '../components/BlogList';
import UserTable from '../components/UsersList';
import Certificates from '../components/Certificates';

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(!window.matchMedia("(min-width: 768px)").matches);
    const [activeTab, setActiveTab] = useState("Dashboard");

    const [year, setYear] = useState("2024");

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
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
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setLoading(false);
                console.log(user);
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
        <>
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
                                onClick={() => setActiveTab("Members")}
                                className={`flex items-center p-2 rounded-lg hover:bg-gray-800 group ${activeTab === "Members" ? "bg-gray-900" : "text-gray-900"}`}
                            >
                                <Users />
                                <span className="ms-3">Members</span>
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
                                onClick={() => setActiveTab("Blogs")}
                                className={`flex items-center p-2 rounded-lg hover:bg-gray-800 group ${activeTab === "Blogs" ? "bg-gray-900" : "text-gray-900"}`}
                            >
                                <Newspaper />
                                <span className="ms-3">Blogs</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => setActiveTab("Users")}
                                className={`flex items-center p-2 rounded-lg hover:bg-gray-800 group ${activeTab === "Users" ? "bg-gray-900" : "text-gray-900"}`}
                            >
                                <UserRoundPlus />
                                <span className="ms-3">Users</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => setActiveTab("Certificates")}
                                className={`flex items-center p-2 rounded-lg hover:bg-gray-800 group ${activeTab === "Certificates" ? "bg-gray-900" : "text-gray-900"}`}
                            >
                                <TicketCheck />
                                <span className="ms-3">Certificates</span>
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

                {activeTab == "Members" ? <MemberTable /> : null}

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
                        <TeamGrid year="2024" />
                    </div>
                    : null}

                {activeTab == "Events" ? <EventHead /> : null}

                {activeTab == "Blogs" ? <BlogTable /> : null}

                {activeTab == "Users" ? <UserTable /> : null}

                {activeTab == "Certificates" ? <Certificates /> : null}
            </div>
        </>
    );
}
