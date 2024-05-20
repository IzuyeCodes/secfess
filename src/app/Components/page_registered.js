/* eslint-disable react-hooks/rules-of-hooks */

import React, {useEffect, useState} from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import msg from "@/pages/msg";

const style_mainContainer = {
    backgroundColor: "black",
};

const registeredPage = ({ data }) => {
    // console.log(data)
    const [msgData, setMsgData] = useState([]);
    const [loading, setLoading] = useState(true);

    // console.log(pesan)
    const SID = data.sid;

    const getMsgData = async () => {
        const response = await axios.post(`${window.location.origin}/api/getMsg`, {
            sid: SID
        });

        if (response.data.status == true) {
            setMsgData(response.data.data)
            // console.log(msgData)
        }
    }

    useEffect( () => {
        getMsgData()
    }, [])

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
                           value={window.origin + "/pesan/" + data.sid}
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

                {msgData ? (
                <div className='sm:flex justify-center sm:gap-5'>
                    {Object.keys(msgData).map(key => (
                        <div key={key} className="block rounded-lg p-6 text-surface shadow-secondary-1 bg-neutral-900 dark:text-white max-w-80 min-w-80">
                            <h5 className="mb-2 text-xl leading-tight font-bold">{msgData[key].nama}</h5>
                            <p className="mb-4 text-base">
                                {msgData[key].pesan}
                            </p>
                            <p className={"mt-1 font-light text-sm"}>{msgData[key].created_at}</p>
                        </div>
                    ))}
                </div>
                    ): (<p>No Messages :(</p>)}
            </motion.div>

        </div>
    )
}

export default registeredPage;
