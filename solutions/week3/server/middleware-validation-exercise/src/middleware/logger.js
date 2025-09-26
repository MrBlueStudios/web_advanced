import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import UAParser from 'ua-parser-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resolvedLogPath = process.env.SERVER_LOG_PATH
  ? path.resolve(process.env.SERVER_LOG_PATH)
  : path.resolve(__dirname, '..', '..', 'server.log');

const ensureLogFileExists = () => {
  const directory = path.dirname(resolvedLogPath);
  fs.mkdirSync(directory, { recursive: true });
  if (!fs.existsSync(resolvedLogPath)) {
    fs.writeFileSync(resolvedLogPath, '', { flag: 'a' });
  }
};

ensureLogFileExists();

const parser = new UAParser();

export const loggerMiddleware = (req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const userAgent = req.get('user-agent') ?? '';
    parser.setUA(userAgent);
    const uaResult = parser.getResult();
    const clientInfo = `${uaResult.browser.name ?? 'Unknown'} ${uaResult.browser.version ?? ''}`.trim();
    const osInfo = `${uaResult.os.name ?? 'Unknown'} ${uaResult.os.version ?? ''}`.trim();

    const logEntry = [
      new Date().toISOString(),
      req.ip,
      req.method,
      req.originalUrl,
      res.statusCode,
      `${duration}ms`,
      `client="${clientInfo}"`,
      `os="${osInfo}"`,
    ].join(' ');

    fs.appendFile(resolvedLogPath, `${logEntry}\n`, (err) => {
      if (err) {
        console.error('Failed to write to log file:', err);
      }
    });
  });

  next();
};

export const logFilePath = resolvedLogPath;
