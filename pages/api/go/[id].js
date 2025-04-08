import fs from 'fs';
import path from 'path';

const dataFile = path.resolve('./data.json');

function loadData() {
    if (!fs.existsSync(dataFile)) return {};
    return JSON.parse(fs.readFileSync(dataFile));
}

function saveData(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
    const {
        query: { id },
    } = req;

    const data = loadData();
    const entry = data[id];
    if (!entry) return res.status(404).end('Link not found');

    const info = {
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
        time: new Date().toISOString(),
    };

    entry.logs.push(info);
    data[id] = entry;
    saveData(data);

    res.writeHead(302, { Location: entry.url });
    res.end();
}
