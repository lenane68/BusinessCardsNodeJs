import fs from 'fs';
import path from 'path';

const errorLogger = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    const status = res.statusCode;

    if (status >= 400) {
      const requestDate = new Date().toISOString();
      const dateFileName = requestDate.split('T')[0] + '.log';
      const logPath = path.join('logs', dateFileName);

      const errorMessage = typeof body === 'string'
        ? body
        : body?.error || 'Unknown error';

      const logEntry = `[${requestDate}] ${req.method} ${req.originalUrl} - ${status} - ${errorMessage}\n`;

      fs.appendFile(logPath, logEntry, (error) => {
        if (error) console.error("Failed to write to log file:", error);
      });
    }

    return originalSend.call(this, body);
  };

  next();
};

export default errorLogger;
