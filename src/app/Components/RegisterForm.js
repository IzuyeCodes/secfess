import {useState} from "react";
import axios from "axios";
import { useRouter } from 'next/router';

const style_boxForms = {
    borderRadius: "20px",
    background: "#ffffff",
    // boxShadow: "5px 5px 10px #c4c4c4, -5px -5px 10px #c4c4c4",
};

export default function RegisterForm() {
    const [nama, setNama] = useState("")
    const [registerProcess, setRegisterProcess] = useState(true)

    const handleKirim = async (e) =>{
        e.preventDefault()
        try{
            const res = await axios.post(`${window.location.href}/api/registerUser`, {
                name: nama
            });
            setNama("")

            if(res.data){
                localStorage.setItem("sid", res.data.sid)
                setRegisterProcess(false)
                router.reload();
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (registerProcess &&
        <div
            className="container mx-auto bg-slate-300 p-6 rounded-lg shadow-lg max-w-md"
            style={style_boxForms}
        >

            <h2 className="text-2xl font-bold text-gray-800 mb-4"></h2>
            <form className="flex flex-col" onSubmit={handleKirim}>
                <input placeholder="Your Name"
                       className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                       type="text"
                       onChange={(e) => setNama(e.target.value)}
                       required={true}
                       value={nama}
                />

                <button
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                    type="submit">Register
                </button>
            </form>

        </div>
    )
}
