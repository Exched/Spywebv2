export default function Home() {
  return (
    <div>
      <h1>Redirect Maker</h1>
      <form id="create-form">
        <input name="url" type="text" placeholder="Target URL" required />
        <button type="submit">Create</button>
      </form>
      <pre id="log"></pre>

      <script dangerouslySetInnerHTML={{ __html: `
        document.getElementById('create-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const res = await fetch('/api/redirect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: e.target.url.value })
          });
          const data = await res.json();
          document.getElementById('log').textContent = location.origin + data.shortUrl;
        });
      ` }} />
    </div>
  );
}
