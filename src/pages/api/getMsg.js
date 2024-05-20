import {get, ref} from "firebase/database";
import database from "@/firebase";
/* eslint-disable import/no-anonymous-default-export */

export default async (req, res) => {
    const { sid } = req.body;
    if (!sid) return res.status(200).json({ status: false, message: "What?" });
    try {
        const refs = ref(database, 'users');
        const snapshot = await get(refs);
        const users = snapshot.val();
        if (!users || !users[sid]) {
            return res.status(200).json({ status: false, message: "User not found" });
        }
        // console.log(users[sid].pesan);
        return res.status(200).json({ status: true, data: users[sid].pesan});
    } catch (e) {
        console.log(e);
    }
};
