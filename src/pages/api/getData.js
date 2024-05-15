import pool from '../../../lib/mysql';

export default async (req, res) => {
    try {
        const { SecretCode } = req.body;
        // console.log(SecretCode)
        const tableName = `_${SecretCode}`;
        const [rows, fields] = await pool.execute(`SELECT * FROM ${tableName}`);
        res.status(200).json({data: rows.reverse(), status: true});
    } catch (error) {
        if (error.code === 'ER_NO_SUCH_TABLE') {
            res.status(200).json({ status: false });
        } else {
            res.status(200).json({ status: false });
        }
    }
};
