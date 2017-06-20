const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const search = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * from famous_people where first_name = $1::text or last_name = $1::text", [search], (err, result) => {
//  client.query("SELECT $1::int AS number", ["1"], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`found ${result.rows.length} person(s) by the name "${search}":`); 
    result.rows.forEach((r, i) => {
      console.log(`- ${i + 1}: ${r.first_name} ${r.last_name}, born '${r.birthdate}'`);
    });
    client.end();
  });
});