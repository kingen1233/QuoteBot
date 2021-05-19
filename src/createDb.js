const pgtools = require("pgtools");
const { databaseName } = require('../config.json');

const config = {
  user: "postgres",
  host: "localhost",
  password: "password",
  port: 5432
};

pgtools.createdb(config, databaseName, function(err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});

process.on('exit', function(code) {
    return console.log(`Database successfully created. Exit code: ${code}`);
});
