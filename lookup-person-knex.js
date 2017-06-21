const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname
  }
});

const search = process.argv[2];


knex.select().from('famous_people')
.where({first_name: search})
.orWhere({last_name: search})
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  console.log(`found ${rows.length} person(s) by the name "${search}":`); 
  rows.forEach((r, i) => {
    console.log(`- ${i + 1}: ${r.first_name} ${r.last_name}, born '${r.birthdate}'`);
  });
});

knex.destroy();