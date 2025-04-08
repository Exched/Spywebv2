export default function Home() {
  return (
    <div style={{ padding: 30, fontFamily: 'Arial' }}>
      <h1>URL Redirect Tracker</h1>
      <form id="create-form">
        <input type="text" id="targetUrl" placeholder="URL tujuan (contoh: https://example.com)" style={{ width: '60%' }} />
        <button type="submit">Buat Link</button>
      </form>
      <p id="result"></p>
      <br />
      <form id="check-form">
        <input type="text" id="shortId" placeholder="ID pendek (contoh: abc123)" />
        <button type="submit">Cek Data</button>
      </form>
      <pre id="log"></pre>

      <script dangerouslySetInnerHTML={{ __html: \`
        document.getElementById('create-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const res = await fetch('/api/redirect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: document.getElementById('targetUrl').value })
          });
          const data = await res.json();
          document.getElementById('result').textContent = location.origin + data.shortUrl;
        });

        document.getElementById('check-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const id = document.getElementById('shortId').value;
          const res = await fetch('/api/check?id=' + id);
          const data = await res.json();
          document.getElementById('log').textContent = JSON.stringify(data, null, 2);
        });
      \` }} />
    </div>
  );
  }
