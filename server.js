var express = require('express'),
    path = require('path'),
    http = require('http'),
    wine = require('./routes/wines');

var app = express();

app.configure(function () {
    app.set('port', process.argv[2] || 8000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);

app.post('/ajax/wine_search.json', wine.searchWine);

app.get('/ajax/foods.json', wine.ajaxFoods);
app.get('/ajax/grapes.json', wine.ajaxGrapes);
app.get('/ajax/tags.json', wine.ajaxTags);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
