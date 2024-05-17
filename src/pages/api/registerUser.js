import pool from '../../../lib/mysql';
import database from "@/firebase";
import { ref, get, push, set } from "firebase/database";
import firebase from 'firebase/app';
import 'firebase/database';

function generateRandomString(length = 6) {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        randomString += lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)];
    }
    return randomString;
}

function generateCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${date}/${month}/${year} ${hours}:${minutes}`;
}

export default async function registerUser (req, res)  {
    const { name } = req.body;
    try {
        const newSid = generateRandomString();
        const time = generateCurrentDateTime();
        const newData = {
            name : name,
            sid : newSid,
            created_at : time
        }

        const newPostRef = ref(database, `users/${newSid}`);
        await set(newPostRef, newData);

        return res.status(200).json({ status: true, sid: newSid});
    } catch (e) {
        console.log(e);
    }
};
