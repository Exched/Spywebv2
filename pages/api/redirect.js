import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const dataFile = path.resolve('./data.json');

function saveData(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

function loadData() {
    if (!fs.existsSync(dataFile)) return {};
    return JSON.parse(fs.readFileSync(dataFile));
}

export default function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'Missing URL' });

    const id = nanoid(6);
    const data = loadData();
    data[id] = { url, logs: [] };
    saveData(data);

    res.status(200).json({ shortUrl: \`/api/go/\${id}\` });
}