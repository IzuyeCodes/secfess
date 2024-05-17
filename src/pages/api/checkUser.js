import pool from '../../../lib/mysql';
import database from "@/firebase";
import { ref, get } from "firebase/database";

// export default async (req, res) => {
//     try {
//         const { sid } = req.body;
//         const [rows, fields] = await pool.execute('SELECT name FROM users WHERE sid = ?', [sid]);
//
//         if (rows.length === 0) {
//             return res.status(200).json({ status: false, message: 'User not found' });
//         }
//
//         res.status(200).json({ data: rows[0], status: true });
//     } catch (error) {
//         console.error(error);
//         res.status(200).json({ status: false, message: 'An error occurred' });
//     }
// };

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
        console.log(users[sid]);
        return res.status(200).json({ status: true, data: users[sid]});
    } catch (e) {
        console.log(e);
    }
};
