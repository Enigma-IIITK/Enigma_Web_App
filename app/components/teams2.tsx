import { cn } from "../utils/cn";
import React from "react";

import { BentoGrid, BentoGridItem } from "./ui/bento-grid1";

export default function BentoGridSecondDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
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
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
const items = [
  {
    title: "TANYA GUPTA",
    description: "Club Lead.",
    header: <img src="/img/TANYAGUPTA.jpg" alt="tanya" className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl" />,
    className: "md:col-span-1",
    
  },
  {
    title: "ADITYA BALIGA",
    description: "Club Lead",
    header:  <img src="/img/ADITYAUBALIGA.png" alt="aditya" className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl" />,
    className: "md:col-span-1",
    
  },
  {
    title: "ASHIQ FIROZ",
    description: "Tech Lead",
    header:  <img src="/img/me.jpg" alt="me" className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl" />,
    className: "md:col-span-1",
    
  },
  {
    title: "SriHarsha Bodicherla",
    description: "Tech Lead",
    header:  <img src="/img/HARSHA.png" alt="Harsha" className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl" />,
    className: "md:col-span-1",
    
  },
  {
    title: "AKHILESH NEKAR",
    description:
      "PR Lead",
    header:  <img src="/img/AKHILESHNEKAR.jpg" alt="akhilesh" className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl" />,
    className: "md:col-span-1",
    
  },
  {
    title: "Amogh M",
    description: "Research Lead",
    header:  <img src="/img/MARIPALLYAMOGH.jpg" alt="AMOUGH" className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl" />,
    className: "md:col-span-1",
    
  },
  {
    title: "GAUTHAM SURESH",
    description: "Design Lead.",
    header:  <img src="/img/gautham.jpg" alt="gautham" className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl" />,
    className: "md:col-span-1",
   
  },
  {
    title: "Aditi Rawat",
    description:
      "Creative Lead",
    header:  <img src="/img/ADITIRAWAT2.jpg" alt="aditi" className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl" />,
    className: "md:col-span-1",
   
  },
  {
    title: "Allu Sumasree",
    description: "PR Lead",
    header:  <img src="/img/SUMASRI.jpg" alt="suma" className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl" />,
    className: "md:col-span-1",
    
  },
];
