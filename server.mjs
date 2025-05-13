// Simple server to test the production build
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

console.log(`Starting server in ${dev ? 'development' : 'production'} mode...`);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  console.log('Next.js app prepared');
  
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      console.log(`Request: ${req.method} ${parsedUrl.pathname}`);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  })
    .once('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      console.log('> Press Ctrl+C to stop the server');
    });
})
.catch(err => {
  console.error('Failed to prepare Next.js app:', err);
  process.exit(1);
}); 