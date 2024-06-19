'use client'
import React from "react";
import { useAuthContext } from "../firebase/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { getAuth } from 'firebase/auth';
import NavBar2 from "../components/navbar2";

function Page() {
    
    
    const auth = getAuth();
    const user = auth.currentUser;
    const router = useRouter()
    
    console.log(user)
    return (
        <section>
            <NavBar2 />
            <section className="flex justify-center items-center h-[100vh]">
                <h1>Logged in as {user == null ? "Nobody" : user.email}</h1>
            </section>
            <Footer />
        </section>
    );
}

export default Page;