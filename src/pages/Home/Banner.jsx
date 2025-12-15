import React from 'react';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router';


const bannerData = [
{
id: 1,
title: "Manage Assets Smarter",
subtitle: "All-in-one Asset Management Platform",
description: "Track, assign, and manage company assets effortlessly with real-time insights and control.",
image: "https://i.ibb.co.com/qFhqzSSY/slide1.jpg",
// image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
cta: "Get Started",
link: '/login'
},
{
id: 2,
title: "Empower Your Team",
subtitle: "Simplified Requests & Approvals",
description: "Employees request assets easily while HR manages everything from a single dashboard.",
image: "https://i.ibb.co.com/7JkxW6ts/slide2.jpg",
// image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
cta: "View Features",
link: '/about'
},
{
id: 3,
title: "Built for HR Excellence",
subtitle: "Insights That Drive Decisions",
description: "Gain full visibility into asset usage, reports, and performance analytics.",
image: "https://i.ibb.co.com/xqB0wg1v/slide3.jpg",
cta: "Explore Dashboard",
link: '/dashboard'
},
];

const Banner = () => {
 const [current, setCurrent] = useState(0);
const length = bannerData.length;
const navigate = useNavigate();



const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

// const handleCTA = (cta) => {
//  if(cta === "Get Started"){
//     navigate('/login')
//  }
//     else if(cta === "View Features"){
//         navigate('/about')
//     }
//     else if(cta === "Explore Dashboard"){
//         navigate('/dashboard')
//     }
// }

return (
<div className="relative w-full min-h-[70vh] p-4 overflow-hidden">
<AnimatePresence>
{bannerData.map((item, index) =>
index === current && (
<motion.section
key={item.id}
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.8 }}
className="absolute inset-0 w-full h-full flex items-center"
>
<img
src={item.image}
alt="banner"
className="absolute inset-0 w-full h-full object-cover"
/>
<div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/30" />


<div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
<motion.div
initial={{ opacity: 0, x: -50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8 }}
>
<p className="text-primary text-sm uppercase tracking-widest mb-3">
{item.subtitle}
</p>
<h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
{item.title}
</h1>
<p className="text-gray-200 text-lg mb-8 max-w-xl">
{item.description}
</p>
<button
onClick={() => navigate(item.link)}
 className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl transition-all">
{item.cta}
<ArrowRight className="w-5 h-5" />
</button>
</motion.div>
</div>
</motion.section>
)
)}
</AnimatePresence>

{/* Arrows */}
<button onClick={prevSlide} className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full z-50">
<ChevronLeft className="w-6 h-6 text-white" />
</button>
<button onClick={nextSlide} className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full z-50">
<ChevronRight className="w-6 h-6 text-white" />
</button>


{/* Dots */}
<div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
{bannerData.map((_, index) => (
<span
key={index}
onClick={() => setCurrent(index)}
className={`w-3 h-3 rounded-full cursor-pointer ${index === current ? 'bg-white' : 'bg-white/50'}`}
/>
))}
</div>
</div>
);
};

export default Banner;