import json
import os
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

APP_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.dirname(APP_DIR)
PORT = int(os.environ.get('PORT', '8765'))
DATA_DIR = os.environ.get('DATA_DIR', APP_DIR)
DATA_FILE = os.path.join(DATA_DIR, 'data.json')
STATIC_DIR = os.environ.get('STATIC_DIR', PARENT_DIR)

os.makedirs(DATA_DIR, exist_ok=True)


class SyncHandler(SimpleHTTPRequestHandler):
    directory = STATIC_DIR

    def end_headers(self):
        if self.path.endswith(('.html', '.js', '.css', '.webmanifest')):
            self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def do_GET(self):
        if self.path.endswith('/api/data'):
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            if os.path.exists(DATA_FILE):
                with open(DATA_FILE, 'r', encoding='utf-8') as f:
                    self.wfile.write(f.read().encode('utf-8'))
            else:
                self.wfile.write(b'{}')
            return
        super().do_GET()

    def do_POST(self):
        self.save_data()

    def do_PUT(self):
        self.save_data()

    def save_data(self):
        if not self.path.endswith('/api/data'):
            self.send_error(404)
            return
        length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(length)
        try:
            data = json.loads(body.decode('utf-8'))
        except (ValueError, UnicodeDecodeError):
            self.send_error(400)
            return
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.end_headers()
        self.wfile.write(b'{"ok":true}')


if __name__ == '__main__':
    server = ThreadingHTTPServer(('0.0.0.0', PORT), SyncHandler)
    print('Energy diary server on port {}'.format(PORT))
    server.serve_forever()
