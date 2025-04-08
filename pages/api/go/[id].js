import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data.json');

function loadData() {
  if (!fs.existsSync(filePath)) return {};
  return JSON.parse(fs.readFileSync(filePath));
}

function saveData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
  const { id } = req.query;
  const data = loadData();

  if (!data[id]) return res.status(404).send('Not found');

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  const log = {
    time: new Date().toISOString(),
    ip,
  };

  data[id].logs.push(log);
  saveData(data);

  res.redirect(data[id].url);
}
