import pool from '../../../lib/mysql';
import database from "@/firebase";
import { ref, get, push, set } from "firebase/database";
import firebase from 'firebase/app';
import 'firebase/database';

function generateCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${date}/${month}/${year} ${hours}:${minutes}`;
}

export default async function saveData (req, res)  {
    const { sid, nama, pesan, i } = req.body;
    console.log(req.body)
    console.log(sid + "ss")
    try {
        const time = generateCurrentDateTime();
        const timestamp = Date.now();
        const newData = {
            nama : nama,
            pesan : pesan,
            created_at : time,
            ip_address : i
        }

        const newPostRef = ref(database, `users/${sid}/pesan/${timestamp}`);
        await set(newPostRef, newData);

        return res.status(200).json({ status: true, message: "Saved"});
    } catch (e) {
        console.log(e);
    }
};
