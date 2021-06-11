var sqlite3 = require('sqlite3').verbose();
var sqlite = require('sqlite');

/**
 @desc: Open sqlite3 connection from file database where in ./data/app.db
 @return: db instance as promise object result
 @author: oesemen
**/
async function connect(){
    return sqlite.open({
        filename: './data/app.db',
        driver: sqlite3.Database,
        mode: sqlite3.OPEN_READWRITE
    });
}

/**
 @desc: Connect to database and insert favourite id
 @param: beerId
 @param: sessionId
 @return: last inserted id
 @author: oesemen
**/
async function insertFavourite(beerId, sessionId){
    return connect().then(function(db){
        return db.run('INSERT INTO favourites(session_id, beer_id) VALUES(?,?)', [sessionId, beerId]).then(function (){
            return db.get('SELECT last_insert_rowid() as ID').then(function(response){
                return response
            })
        })
    })
}

/**
 @desc: Check favourite id if already exist
 @param: beerId
 @param: sessionId
 @return: boolean
 @author: oesemen
 **/
async function checkFavourite(beerId, sessionId){
    return connect().then(function (db){
        return db.all('SELECT * FROM favourites Where beer_id=(?) and session_id=(?)', [beerId, sessionId]).then(function(rows){
            return rows.length > 0
        })
    })
}

/**
 @desc: Connect to database and insert favourite id
 @param: beerId
 @return: last inserted id
 @author: oesemen
**/
async function deleteFavourite(beerId){
    return connect().then(function(db){
        return db.run('DELETE FROM favourites where id=(?)', beerId);
    })
}

/**
 @desc: Connect to database and delete favourite
 @return: all rows in favourites
 @param: sessionId
 @author: oesemen
**/
async function getFavourites(sessionId){
    return connect().then(function (db){
        return db.all('SELECT * FROM favourites Where session_id=(?)', sessionId).then(function(rows){
            return rows
        })
    })
}

module.exports = {insertFavourite, deleteFavourite, getFavourites, checkFavourite}
