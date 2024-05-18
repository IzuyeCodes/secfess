"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import MenfessBox from "@/app/Components/MenfessBox";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import Header from "@/app/Header";
import url from "url";
import Grbf from "@/app/xx";
import {useRouter} from "next/navigation";
import {useTime} from "framer-motion";

export default function Home({ params: SecretCode }) {

    const [nama, setNama] = useState("");
    const [pesan, setPesan] = useState("");
    const [fessData, setFessData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isExist, setIsExist] = useState(false);
    const [SID, setSID] = useState(null);
    const [sent, setSent] = useState(false)

    const sid = SecretCode.SecretCode;

    useEffect(() => {
        checkCode()
    }, []);

    const checkCode = async () => {
        try {
            const response = await axios.post(`${window.location.origin}/api/checkUser`, {
                sid
            });
            console.log(response)
            if (response.data.status == true){
                setIsExist(true)
                setSID(SecretCode.SecretCode)
                setLoading(false)
                console.log('all ok')
                return true;
            } else{
                return false;
            }

        } catch (error) {
            if (error.response && error.response.status === 404) {
                return false;
            } else {
                return false;
            }
        }
    }

    const resetForm = () => {
        setNama("");
        setPesan("");
    };

    const handleKirim = async (e) => {
        e.preventDefault();
        try {
            const getIP = await axios.get('https://api64.ipify.org?format=json')

            const newFessData = {
                sid,
                nama,
                pesan,
                i: getIP.data.ip
            };

            await axios.post(window.location.origin + "/api/saveData", newFessData);

            resetForm();
            toast.success("Pesan terkirim!");
            setSent(true)
        } catch (error) {
            console.error("Terjadi kesalahan:", error.message);
            toast.error("Terjadi kesalahan. Silakan coba lagi.");
        }
    };

    const getData = async () => {
        try {
            const res = await axios.get(window.location.href + "/api/getData");
            // setFessData(...[res.data])
        } catch (err) {
            console.error("Error when getting data: ", err);
        }
    }

    // useEffect(() => {
    //   if (!fessData) {
    //     getData(SecretCode);
    //     console.log("Get data ok")
    //     setLoading(false)
    //   }
    // }, []);

    const style_mainContainer = {
        backgroundColor: "black",
    };
    const style_boxMenfessData = {
        borderRadius: "20px",
        background: "#ffffff",
        // boxShadow: "5px 5px 10px #c4c4c4, -5px -5px 10px #c4c4c4",
    };
    const style_boxForms = {
        borderRadius: "20px",
        background: "#ffffff",
        // boxShadow: "5px 5px 10px #c4c4c4, -5px -5px 10px #c4c4c4",
    };

    const style_imgs = {
        width: "100px",
        paddingTop: "25px",
        paddingBottom: "25px",
    };
    // End Styling

    return (
        <>
            <Helmet>
                <title>Fess</title>
                <meta name="description" content="Fess made by Izuye" />
                <meta property="og:title" content="Fess" />
                <meta property="og:description" content="Just say it" />
                <meta property="og:image" content="https://media.tenor.com/a7qa0Uk3F30AAAAi/peach-goma-peach-and-goma.gif" />
                <meta property="og:url" content="https://w.izuye.my.id/Fess" />
                <meta property="og:type" content="website" />
            </Helmet>
            <Header />
            <div
                className="bg-slate-200 min-h-screen flex flex-col items-center main-container"
                style={style_mainContainer}
            >
                {loading && (" ")}
                {isExist && !sent && (<>
                    <div
                        className="text-black font-bold text-4xl tracking-wide subpixel-antialiased mb-6 mt-10 headtext"
                    >
                        Say <span style={{backgroundColor: "#00ff62", color: "black"}}> anything</span> to me
                    </div>

                    <div
                    className="container mx-auto bg-slate-300 p-6 rounded-lg shadow-lg max-w-md"
                    style={style_boxForms}
            >

                <h2 className="text-2xl font-bold text-gray-800 mb-4"></h2>
                <form className="flex flex-col" onSubmit={handleKirim}>
                    <input placeholder="Anonym Name"
                           className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                           type="text"
                           onChange={(e) => setNama(e.target.value)}
                           required={true}
                           value={nama}
                    />
                    <textarea placeholder="Pesan"
                              className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 h-24"
                              name="pesan"
                              onChange={(e) => setPesan(e.target.value)}
                              required={true}
                              value={pesan}
                    ></textarea>

                    <button
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                        type="submit">Submit
                    </button>
                </form>

            </div>
                    </>
            )}

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                    pauseOnHover={false}
                    theme="dark"
                />

                <p className={"mt-5 font-poppins"} style={{fontFamily: "Kalam"}}>
                    Made by Izuye
                </p>

                {/*<Grbf />*/}
            </div>
        </>
    );
}
