import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import { config } from "../../config/app.config";

// Define log format
// 2024-12-27 10:00:00 [INFO]: This is a log message
const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

// Create logger instance
// "production": O nível de log será info (logs de informação e níveis mais elevados, como warn e error).
// Outros ambientes (desenvolvimento): O nível será debug (captura logs de debug, info, warn, e error).
export const logger = createLogger({
  level: config.NODE_ENV === "production" ? "info" : "debug",
  format: logFormat,
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      dirname: "logs",
      filename: "%DATE%-app.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});
