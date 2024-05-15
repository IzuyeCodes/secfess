
import React, { useState, useEffect } from "react";
import "../MenfessBox.css";
// import { getDatabase, ref, onValue } from "firebase/database";
// import { db } from "./firebase";
import pool from '../../../lib/mysql';
import axios from 'axios';
import Image from "next/image";

const MenfessBox = ({data}) => {
    const [menfessData, setMenfessData] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(data)

    const getData = async () => {
        try {
            const res = await axios.get(window.location.href + "/api/getData");
            // console.log(res.data)
            setMenfessData(res.data)
            setLoading(false)
        } catch (err) {
            console.error("Error when getting data: ", err);
        }
    };

    useEffect(() => {
        getData();

        return () => {
        };
    }, []);

    const style_dataBox = {
        fontFamily: "Josefin Sans",
        color: "black"
    };

    const footerStyle = {
        fontSize: "10px",
    };

    return (
        <div>
            {/*<h2*/}
            {/*    className="text-black font-bold font-poppins text-3xl mb-4 pt-4 text-center message-head"*/}
            {/*>*/}
            {/*    Recent Messages*/}
            {/*</h2>*/}
            <div className="max-h-screen overflow-y-auto custom-scrollbar">
            {loading ? (
                // Skeleton loading effect
                <div className="skeleton-loading">
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line"></div>
                </div>
            ) : (
                // Display data when not loading
                menfessData.map((item, index) => (
                    <div
                        key={index}
                        className="mb-4 p-4 message-lists"
                    >
                        <div className="flex items-center">
                            <div className="w-14 h-14 relative">
                                <Image
                                    src="/anony.png"
                                    alt="Anonymous profile picture"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="flex-1 ml-4">
                                <p className="font-bold message-from">{item.nama}</p>
                                <p className="font-medium">{item.pesan}</p>
                                <p className="font-mono" style={footerStyle}>
                                    {item.waktu}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            )} </div>
        </div>
    );
};

export default MenfessBox;
