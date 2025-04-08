import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data.json');

function saveData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function loadData() {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath);
  return JSON.parse(raw);
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { url } = req.body;
  const id = Math.random().toString(36).substring(2, 8);
  const data = loadData();

  data[id] = { url, logs: [] };
  saveData(data);

  res.status(200).json({ shortUrl: `/api/go/${id}` });
}
