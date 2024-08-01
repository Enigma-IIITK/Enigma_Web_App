"use client"
import { cn } from "../utils/cn";
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid1";
import { db } from "../firebase/addData";  
import { collection, getDocs, query, where } from 'firebase/firestore';

const roles = [
    "Club Lead", "Tech Lead", "Design Lead", "PR Lead",
    "Research Lead", "Creative Lead", "Tech Sub Lead",
    "Design Sub Lead", "PR Sub Lead", "Research Sub Lead",
    "Creative Sub Lead"
];

export default function BentoGridSecondDemo() {
  const [items, setItems] = useState([]);
  const [year, setYear] = useState('2024');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const teamCollection = collection(db, 'team');
        const q = query(teamCollection, where("year", "==", year));
        const teamSnapshot = await getDocs(q);
        const teamList = teamSnapshot.docs.map(doc => doc.data());

        const sortedItems = teamList.sort((a, b) => {
          return roles.indexOf(a.title) - roles.indexOf(b.title);
        });

        setItems(sortedItems);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, [year]);

  return (
    <div className="h-screen">
      <div className="container mx-auto py-4">
        <div className="flex justify-center">
         
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            {/* Add more years as needed */}
          </select>
        </div>
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      </div>

      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.name}
            description={item.title}
            header={<div className="w-full h-52 overflow-hidden rounded-xl flex items-center justify-center">
              <img src={item.path} alt={item.name} className="w-full h-full object-cover rounded-xl" />
          </div>}
            className="md:col-span-1"
          />
        ))}
      </BentoGrid>
    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
