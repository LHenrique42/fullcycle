const mysql = require("mysql");
const util = require("util");

const config = {
  host: process.env.MYSQL_HOST || "mysql",
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "fullcycle",
};

const maxAttempts = Number(process.env.DB_WAIT_MAX_ATTEMPTS || 30);
const delayMs = Number(process.env.DB_WAIT_INTERVAL_MS || 2000);

async function waitForMySql(attempt = 1) {
  const connection = mysql.createConnection(config);
  const connect = util.promisify(connection.connect).bind(connection);
  const ping = util.promisify(connection.ping).bind(connection);

  try {
    await connect();
    await ping();
    console.log("MySQL is available.");
    connection.end();
    process.exit(0);
  } catch (error) {
    connection.destroy();
    if (attempt >= maxAttempts) {
      console.error(
        `MySQL not ready after ${attempt} attempts: ${error.message}`,
      );
      process.exit(1);
    }
    console.log(
      `Attempt ${attempt}/${maxAttempts} failed: ${error.message}. Retrying in ${delayMs}ms...`,
    );
    setTimeout(() => waitForMySql(attempt + 1), delayMs);
  }
}

waitForMySql();
