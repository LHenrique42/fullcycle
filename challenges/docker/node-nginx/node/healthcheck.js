const mysql = require("mysql");
const util = require("util");

const config = {
  host: process.env.MYSQL_HOST || "mysql",
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "fullcycle",
};

(async () => {
  const connection = mysql.createConnection(config);
  const connect = util.promisify(connection.connect).bind(connection);
  const ping = util.promisify(connection.ping).bind(connection);
  try {
    await connect();
    await ping();
    connection.end();
    process.exit(0);
  } catch (error) {
    connection.destroy();
    console.error(`MySQL healthcheck failed: ${error.message}`);
    process.exit(1);
  }
})();
