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

const first_name = process.argv[2];
const last_name = process.argv[3];
const date_of_birth = process.argv[4];

knex('famous_people')
.insert({
  first_name,
  last_name,
  birthdate: date_of_birth
})
.then(() => console.log('done'));


knex.destroy();