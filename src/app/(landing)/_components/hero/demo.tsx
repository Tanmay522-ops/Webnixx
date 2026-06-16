import React from "react";

export default function Example() {
    return (
        <div className="flex flex-col items-center justify-center max-w-9xl w-full mx-2 rounded-2xl shadow-md bg-gradient-to-b from-[#5524B7] to-[#0B1860] px-4 py-20 text-center">
            <div className="flex items-center -space-x-7">
                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="host"
                    className="h-16 w-16 rounded-full border-4 border-white" />
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="host"
                    className="h-16 w-16 rounded-full border-4 border-white" />
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                    alt="host"
                    className="h-16 w-16 rounded-full border-4 border-white" />
                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="host"
                    className="h-16 w-16 rounded-full border-4 border-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-6">
                Host Smarter Webinars with AI
            </h1>
            <p className="text-white mt-4 max-w-md">
                Join thousands of creators and businesses using Webnixx to run engaging, AI-powered live webinars that convert viewers into customers.
            </p>
            <button className="bg-gradient-to-r from-[#6B41FF] to-[#F75BE9] font-medium text-white rounded-lg px-20 py-3 mt-10 text-sm">
                START FOR FREE
            </button>
        </div>
    );
};