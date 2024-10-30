import React from 'react';
import { Link } from 'react-router-dom';
import img from '../img/undraw_projections_re_ulc6.svg'

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-200">
            <main className="flex justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
                <div className="w-full sm:w-11/12 md:w-5/6 lg:w-3/4">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 lg:space-y-10 mb-12 lg:mb-0">
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-tight">
                                Take control of <br className="hidden sm:inline" /> your finances
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                                Spend less time worrying about your expenses and focus on becoming financially stable with our easy-to-use expense tracker.
                            </p>
                            <div>
                                <Link 
                                    to="/register" 
                                    className="inline-block bg-teal-600 text-white px-6 py-3 rounded-full text-lg hover:bg-teal-700 transition-colors duration-300"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
                            <img
                                src={img}
                                alt="Finance Control Illustration"
                                className="max-w-full h-auto mx-auto lg:ml-auto"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}