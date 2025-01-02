import React from "react";
import { Link } from "react-router";

function Home () {

    return (
        <div className="bg-contain bg-center bg-no-repeat bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZv-ZQJdGc6DS6PIrwB5YxuWVKmhFwNw7ufQ&s)] page home h-screen w-full pt-5 flex justify-between flex-col bg-amber-400">
            <header>
                Uber
            </header>
            <section className="bg-white py-4 px-4">
                <h2 className="text-2xl font-bold">
                    Get started with uber
                </h2>
                <Link to="/login" className="inline-block w-full bg-black text-white rounded mt-4 py-3 text-center">
                    Continue
                </Link>
            </section>
        </div>
    )
}

export default Home;