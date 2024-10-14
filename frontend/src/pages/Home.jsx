import React from 'react';
import img from '../img/undraw_projections_re_ulc6.svg'
function Home() {
    return (
        <div className="min-h-screen">
            <main className="container mx-auto flex flex-col md:flex-row items-center justify-between py-16 px-18 ml-[250px]">
                <div className=" text-center md:text-left space-y-10">
                    <h1 className="text-8xl font-bold mb-4 tracking-tighter">Take control of <br /> your finances</h1>
                    <p className="text-md mb-6">
                        Spend less time worrying about your expenses and focus on becoming <br />financially stable with our easy-to-use expense tracker.
                    </p>
                    <div>
                    <a
                        href="/register"
                        className="bg-teal-600 text-white px-6 py-3 rounded-full text-lg hover:bg-teal-700"
                    >
                        Get Started
                    </a>
                    </div>
                </div>
                <div className="md:w-1/2 ml-28 mt-12">
                    <img src={img} alt="Finance Control Illustration" className="max-w-full h-auto" />
                </div>
            </main>
        </div>
    );
}

export default Home;
