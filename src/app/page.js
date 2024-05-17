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
import { motion } from 'framer-motion';
import Page_registered from "@/app/Components/page_registered";
import RegisterForm from "@/app/Components/RegisterForm";

export default function Home() {

  const [username, setUsername] = useState("");
  const [pesan, setPesan] = useState("");
  const [fessData, setFessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false)

  const [isRegistered, setIsRegistered] = useState(false)
  console.log(isRegistered)
  // localStorage.setItem("sid" , "123")

  const resetForm = () => {
    setNama("");
    setPesan("");
  };

  const handleKirim = async (e) => {
    e.preventDefault();
    try {
      const getIP = await axios.get('https://api64.ipify.org?format=json')

      const newFessData = {
        nama,
        pesan,
        i: getIP.data.ip
      };

      await axios.post(window.location.href + "/api/saveData", newFessData);

      resetForm();
      toast.success("Pesan terkirim!");
    } catch (error) {
      console.error("Terjadi kesalahan:", error.message);
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(window.location.href + "/api/getData");
      setFessData(...[res.data])
    } catch (err) {
      console.error("Error when getting data: ", err);
    }
  }

  // localStorage.setItem("sid", "keke");
  const checkRegistered = async () => {
    const SID = localStorage.getItem("sid" || null)
    console.log(SID)
    if (SID != null) {
      try {
        const res = await axios.post(`${window.location.href}/api/checkUser`, {
          sid: SID
        });
        // console.log(res.data)
        setIsRegistered(true);
        setUsername(res.data.data)
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    checkRegistered()
  }, []);

  const style_mainContainer = {
    backgroundColor: "black",
  };
  const style_boxMenfessData = {
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


  return isRegistered ? (
      <>
        <Helmet>
          <title>Fess</title>
          <meta name="description" content="Fess made by Izuye"/>
          <meta property="og:title" content="Fess"/>
          <meta property="og:description" content="Just say it"/>
          <meta property="og:image" content="https://media.tenor.com/a7qa0Uk3F30AAAAi/peach-goma-peach-and-goma.gif"/>
          <meta property="og:url" content="https://w.izuye.my.id/Fess"/>
          <meta property="og:type" content="website"/>
        </Helmet>
        <Header/>
        <Page_registered data={ username } />
</>
    ) : (
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
              className="bg-slate-200 min-h-screen min-w-screen flex flex-col items-center justify-center main-container"
              style={style_mainContainer}
          >

            <div className="items-center justify-center min-w-80">
              <div
                  className="text-black font-bold text-5xl tracking-wide subpixel-antialiased mb-6 mt-10 text-center headtext"
              >
                Say <span
                  className="box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 py-1"> anything</span> Anonymously
              </div>

              <div className="sm:flex justify-center sm:gap-5 mt-20">
                <div
                    className="block rounded-lg p-6 text-surface shadow-secondary-1 bg-neutral-900 dark:text-white max-w-80">
                  <h5 className="mb-2 text-xl leading-tight font-bold">Anonymously</h5>
                  <p className="mb-4 text-base">
                    Send any messages anonymously, no one knows you lol.
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

              <div
                  className="mt-10 flex justify-center items-center"
              >
                <button
                    className="flex bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-6 rounded-full shadow-lg shadow-neutral-950 hover:text-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse"
                    onClick={() => setIsRegistering(true)}
                >
                  Get started
                </button>
              </div>

              <div className="mt-10">
                {isRegistering ? (
                    <RegisterForm />
                ) : ("")}
              </div>

            </div>
            {/*<Grbf />*/}
          </div>
        </>
    );

}
