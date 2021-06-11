var db = require('../lib/db');

/**
 @desc: Root route returns main view where in public *.html
 @method: GET /
 @author: oesemen
**/
app.get('/', function (req, res){
    res.render('index.html')
})

/**
 @desc: Fetch user favourites from database
 @method: GET /favourites
 @returns: json
 @author: oesemen
 */
app.get('/favourites', function(req, res){
    var sessionId = req.session.id;

    db.getFavourites(sessionId).then(function(rows){
        res.status(200).json({"message": "ok", "list": rows})
    }).catch(function(err){
        res.status(500).json(err)
    })
})

/**
 @desc: Get id from url params and innsert to database
 @method: POST /favourites/id
 @returns: json
 @author: oesemen
 */
app.post('/favourites/:id', function(req, res){
    var id = req.params.id;
    var sessionId = req.session.id;

    db.checkFavourite(id, sessionId).then(function(exist){
        if(!exist){
            db.insertFavourite(id, sessionId).then(function(result){
                if(result){
                    res.status(200).json({"message": "success", "id": result})
                }
            }).catch(function(err){
                res.status(500).json(err)
            })
        }else{
            res.status(204).json({"message": "exist"})
        }
    })
})

/**
 @desc: Handles the favourite beer id from url params and delete from database
 @method: DELETE /favourites/id
 @returns: json
 @author: oesemen
 */
app.delete('/favourites/:id', function(req, res){
    var id = req.params.id;

    db.deleteFavourite(id).then(function(){
        res.status(204).json({"message": "success"})
    }).catch(function(err){
        res.status(500).json(err)
    })
})
