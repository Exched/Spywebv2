import fs from 'fs';
import path from 'path';

const dataFile = path.resolve('./data.json');

function loadData() {
    if (!fs.existsSync(dataFile)) return {};
    return JSON.parse(fs.readFileSync(dataFile));
}

export default function handler(req, res) {
    const { id } = req.query;
    const data = loadData();

    if (!data[id]) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(data[id]);
}