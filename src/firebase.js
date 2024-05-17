// import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import 'firebase/database';
import {getDatabase} from "firebase/database";
import * as firebase from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.FB_KEY,
    authDomain: process.env.FB_AUTHDOMAIN,
    databaseURL: process.env.FB_DBURL,
    projectId: process.env.FB_PROJECTID,
    storageBucket: process.env.FB_STORAGEBUCKET,
    messagingSenderId: process.env.FB_MESGSENDERID,
    appId: process.env.FB_APPID
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
