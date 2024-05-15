import pool from '../../../lib/mysql';

const generateDateFormat = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const formattedDate = `${day}/${month}/${year} ${hours}.${minutes}`;

    return formattedDate;
};

export default async (req, res) => {
    try {
        const { SecretCode } = req.body;
        const tableName = `data_${SecretCode}`;
        await pool.execute(`
      CREATE TABLE IF NOT EXISTS \`${tableName}\` (
        \`id\` INT(10) NOT NULL AUTO_INCREMENT,
        \`nama\` TEXT NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
        \`pesan\` TEXT NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
        \`waktu\` TEXT NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
        \`ip_address\` TEXT NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
        PRIMARY KEY (\`id\`) USING BTREE
      )
      COLLATE='utf8mb4_0900_ai_ci'
    `);
        const { nama, pesan, i } = req.body;
        await pool.execute('INSERT INTO \`data_${SecretCode}\` (nama, pesan, waktu, ip_address) VALUES (?, ?, ?, ?)', [nama, pesan, generateDateFormat(), i]);
        res.status(200).json({status : true});
    } catch (error) {
        if (error.code === 'ER_NO_SUCH_DATABASE') {
            res.status(500).json({ error: 'Database not found' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};
