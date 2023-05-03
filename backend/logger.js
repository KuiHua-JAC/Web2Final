const pino = require("pino");
const transport = pino.transport({
  targets: [
    {
      level: "trace", // support logging of all levels to this location
      target: "pino/file",
    },
    {
      level: "trace", // support logging of all levels to this location
      target: "pino/file",
      options: { destination: "logs/server-log" }, // log to this file
    },
  ],
});

const minimum_log_level = "debug";

const logger =
  process.env.CONSOLE_ONLY == "true"
    ? pino({
        level: process.env.PINO_LOG_LEVEL || minimum_log_level, // minimum level to log
      })
    : pino(
        {
          level: process.env.PINO_LOG_LEVEL || minimum_log_level, // minimum level to log
        },
        transport
      );

module.exports = logger;
