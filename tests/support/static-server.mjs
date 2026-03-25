import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "dist");
const port = Number(process.argv[3] ?? 4322);
const host = "127.0.0.1";

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".json", "application/json; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
]);

const resolvePath = (requestUrl) => {
  const pathname = new URL(requestUrl, "http://localhost").pathname;
  const normalized = path.normalize(path.join(root, pathname));

  if (normalized !== root && !normalized.startsWith(`${root}${path.sep}`)) {
    return null;
  }

  return normalized;
};

const sendFile = async (res, filePath) => {
  const extension = path.extname(filePath);
  const contentType = contentTypes.get(extension) ?? "application/octet-stream";
  const body = await fs.readFile(filePath);

  res.writeHead(200, { "content-type": contentType });
  res.end(body);
};

const sendNotFound = async (res) => {
  const notFoundPath = path.join(root, "404.html");

  try {
    const body = await fs.readFile(notFoundPath);
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
};

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    await sendNotFound(res);
    return;
  }

  const filePath = resolvePath(req.url);

  if (!filePath) {
    await sendNotFound(res);
    return;
  }

  try {
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, "index.html");
      await sendFile(res, indexPath);
      return;
    }

    await sendFile(res, filePath);
  } catch {
    await sendNotFound(res);
  }
});

server.listen(port, host, () => {
  process.stdout.write(`Serving ${root} on http://${host}:${port}\n`);
});

const shutdown = () => {
  server.close(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
