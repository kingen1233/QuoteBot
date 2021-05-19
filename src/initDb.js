const db = require('./db')
db.init()

process.on('exit', function(code) {
    return console.log(`Database successfully initialized. Exit code: ${code}`);
});