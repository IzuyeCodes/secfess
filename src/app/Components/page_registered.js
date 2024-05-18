import React, {useState} from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const style_mainContainer = {
    backgroundColor: "black",
};

const registeredPage = ({ data }) => {
    console.log(data)
    const [menfessData, setMenfessData] = useState([]);
    const [loading, setLoading] = useState(true);

    return (
        <div
            className="bg-slate-200 min-h-screen min-w-screen flex flex-col items-center main-container"
            style={style_mainContainer}
        >
            <motion.div
                initial={{y: 200, opacity: 1}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.5, delay: 2}}
                className="items-center justify-center min-w-80 mt-20"
            >
                <div
                    className="text-black font-bold text-5xl tracking-wide subpixel-antialiased mb-6 text-center headtext"
                >
        <span
            className="box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 py-1"
        >
          Welcome
        </span>{" "}
                    back, {data.name}!
                </div>
                <div className="sm:flex justify-center sm:gap-5 mt-20">
                </div>
            </motion.div>
            {/*<Grbf />*/}

            {/**/}
            <motion.div
                initial={{y: 0, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.5, delay: 3}}
                className="bg-slate-100 p-4 flex flex-col rounded-xl">
                <div>
                    <h2 className="text-center font-bold text-2xl">Your Link</h2>
                </div>
                <div className="mt-5 px-8 py-3">
                    <input placeholder="Your link"
                           className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                           type="text"
                           readOnly={true}
                           value={"https://fess.aizuye.com/" + data.sid}
                    />
                </div>
                <div className="flex flex-col items-center">
                    <button className="bg-blue-400 hover:bg-blue-700 rounded w-20 h-8">Copy</button>
                </div>
            </motion.div>

            <motion.div
                initial={{y: 100, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.5, delay: 3}}
                className="mt-10"
            >

                <h1 className="message-head text-center text-2xl mb-5">
                    Recent Messages
                </h1>

                <div className='sm:flex justify-center sm:gap-5'>
                    <div
                        className="block rounded-lg p-6 text-surface shadow-secondary-1 bg-neutral-900 dark:text-white max-w-80">
                        <h5 className="mb-2 text-xl leading-tight font-bold">Ania</h5>
                        <p className="mb-4 text-base">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, illo!
                        </p>
                    </div>

                    <div
                        className="block rounded-lg p-6 text-surface shadow-secondary-1 bg-neutral-900 dark:text-white max-w-80">
                        <h5 className="mb-2 text-xl leading-tight font-bold">Private</h5>
                        <p className="mb-4 text-base">
                            Only you can see the messages.
                        </p>
                    </div>
                </div>

                {/*<h2*/}
                {/*    className="text-white font-bold font-poppins text-3xl mb-4 pt-4 text-center message-head"*/}
                {/*>*/}
                {/*    Recent Messages*/}
                {/*</h2>*/}
                {/*<div className="max-h-screen overflow-y-auto custom-scrollbar">*/}
                {/*    {loading ? (*/}
                {/*        // Skeleton loading effect*/}
                {/*        <div className="skeleton-loading">*/}
                {/*            <div className="skeleton-line"></div>*/}
                {/*            <div className="skeleton-line"></div>*/}
                {/*            <div className="skeleton-line"></div>*/}
                {/*        </div>*/}
                {/*    ) : (*/}
                {/*        // Display data when not loading*/}
                {/*        menfessData.map((item, index) => (*/}
                {/*            <div*/}
                {/*                key={index}*/}
                {/*                className="mb-4 p-4 message-lists"*/}
                {/*            >*/}
                {/*                <div className="flex items-center">*/}
                {/*                    <div className="w-14 h-14 relative">*/}
                {/*                        <Image*/}
                {/*                            src="/anony.png"*/}
                {/*                            alt="Anonymous profile picture"*/}
                {/*                            layout="fill"*/}
                {/*                            objectFit="cover"*/}
                {/*                        />*/}
                {/*                    </div>*/}
                {/*                    <div className="flex-1 ml-4">*/}
                {/*                        <p className="font-bold message-from">{item.nama}</p>*/}
                {/*                        <p className="font-medium">{item.pesan}</p>*/}
                {/*                        <p className="font-mono" style={footerStyle}>*/}
                {/*                            {item.waktu}*/}
                {/*                        </p>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        ))*/}
                {/*    )} </div>*/}
            </motion.div>

        </div>
    )
}

export default registeredPage;
