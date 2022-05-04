const sqlite = require('sqlite3');

let db= new sqlite.Database('./Color.db',sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
/*db.run(CREATE TABLE Color IF NOT EXISTS (
    id INTEGER PRMARY KEY  AUTOINCREMET,
    name VARCHAR (20) NOT NULL UNIQUE,
    embanew VARCHAR (20),
    embamixed VARCHAR (20),
    simcanew VARCHAR (20),
    simcamixed VARCHAR (20),
    totalnew FLOAT (30),
    totalmixed FLOAT (30)

)`);*/

module.exports = db;