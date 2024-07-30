"use client"
import PricingPlan from '@/data/PricingPlan';
import { useUser } from '@clerk/nextjs';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import React from 'react';

function Upgrade() {
    const { user } = useUser();
    return (
        <div className='p-10'>
            <div className="flex flex-col justify-between mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 gap-20">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
                    {PricingPlan.map((item, index) => (
                        <div key={index} className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
                            <div className="text-center">
                                <h2 className="text-lg font-medium text-gray-900">
                                    {item.type}
                                    <span className="sr-only">Plan</span>
                                </h2>
                                <p className="mt-2 sm:mt-4">
                                    <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> {item.price}$ </strong>
                                    <span className="text-sm font-medium text-gray-700">/{item.duration}</span>
                                </p>
                            </div>
                            <ul className="mt-6 space-y-2">
                                <li className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <span className="text-gray-700"> {item.users} users included </span>
                                </li>
                                <li className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <span className="text-gray-700"> {item.gb}GB of storage </span>
                                </li>
                                <li className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <span className="text-gray-700"> Email support </span>
                                </li>
                                <li className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <span className="text-gray-700"> {item.access} </span>
                                </li>
                            </ul>
                            <a
                                href={item.link + '?prefilled_email=' + user?.primaryEmailAddress.emailAddress}
                                target='_blank'
                                className="mt-8 block rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                            >
                                Get Started
                            </a>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <div className="flex justify-center space-x-4 mb-4">
                        <a href="https://facebook.com/mockview" target="_blank" className="text-blue-600 hover:text-blue-800">
                            <Facebook className="h-6 w-6" />
                        </a>
                        <a href="https://twitter.com/mockview" target="_blank" className="text-blue-400 hover:text-blue-600">
                            <Twitter className="h-6 w-6" />
                        </a>
                        <a href="https://instagram.com/mockview" target="_blank" className="text-pink-600 hover:text-pink-800">
                            <Instagram className="h-6 w-6" />
                        </a>
                        <a href="https://linkedin.com/company/mockview" target="_blank" className="text-blue-700 hover:text-blue-900">
                            <Linkedin className="h-6 w-6" />
                        </a>
                    </div>
                    <p className="text-sm text-gray-500">© 2024 Mockview. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default Upgrade;