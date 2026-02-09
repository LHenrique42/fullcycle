const express = require("express");
const mysql = require("mysql");
const util = require("util");

const app = express();

const mysqlConfig = {
  host: process.env.MYSQL_HOST || "mysql",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "fullcycle",
  port: Number(process.env.MYSQL_PORT || 3306),
};

const pool = mysql.createPool(mysqlConfig);
const query = util.promisify(pool.query).bind(pool);

async function ensureSchema() {
  await query(
    "CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)",
  );
}

app.get("/", async (req, res) => {
  try {
    await ensureSchema();
    await query("INSERT INTO people(name) VALUES('Person Name')");
    const rows = await query("SELECT id, name FROM people");

    let table = "<table><thead><tr><th>#</th><th>Name</th></tr></thead><tbody>";
    for (const row of rows) {
      table += `<tr><td>${row.id}</td><td>${row.name}</td></tr>`;
    }
    table += "</tbody></table>";

    res.send(`<h1>Full Cycle Rocks!!</h1>${table}`);
  } catch (error) {
    console.error("Error handling request", error);
    res.status(500).send("Internal Server Error");
  }
});

const port = 3000;

app.listen(port, () => console.log(`App listening on port ${port}!`));
