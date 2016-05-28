/*
Here is where you set up your server file.
express middleware.
*/

var cookieParser = require('cookie-parser');
var session = require('express-session');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var Loc = "";
var Place = "";
var pos;
var locArry = [];
var yelpArr = [];
var strArry = [];
var btArry = [];


var app = express();

//allow sessions
app.use(session({ secret: 'app', cookie: { maxAge: 600000000000 }}));
app.use(cookieParser());

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var application_controller = require('./controllers/application_controller.js');
var cats_controller = require('./controllers/cats_controller.js');
var users_controller = require('./controllers/users_controller.js');

app.use('/', application_controller);
app.use('/', cats_controller);
app.use('/users', users_controller);

// -------------------------------------------------------------------------------------------------------------
// shows first route
app.get('/', function(req, res){
 
});
//gets yelp info
app.get('/yelp', function(req, res){

	// console.log(locArry[1][0].formattedAddress, "hey")

          function yelpz(){
          var Yelp = require('yelp');


          // Loc = strArry[0][0].formattedAddress;





          var yelp = new Yelp({
            consumer_key: '5TBzLTyOV4OVhUrzGgaVBQ',
            consumer_secret: 'ag4xe5h3-ZGe3huiPQr1j5kX3LE',
            token: 'W2ILo6yUGiwfB4gsmEH8rvBqQjcwNGQh',
            token_secret: 'yNyEskFCaeehJwzCYJGrNCENtLU',
          });

          // See http://www.yelp.com/developers/documentation/v2/search_api
          yelp.search({ term: Place, location: Loc, limit:20 })
          .then(function (data) {
            // if (data.length=2) {
               // console.log(data.businesses[0].id);

            // };
            yelpArr = [];
            var b = 0;
            console.log(data.businesses.length);
                 for (var i = 0; i < data.businesses.length; i++) {
              // if (data.businesses[i].rating > 3) {
                
               // console.log(data.businesses[i].id)
               for (var a = 0; a < btArry.length; a++) {
                 // console.log(btArray[a])
            if (data.businesses[i].id == btArry[a]) {

              var numInArray = data.businesses.indexOf(data.businesses[i]);
                    //spice deletes once at that index
              data.businesses.splice(numInArray, 1)


            }
            
            };
              console.log([i])
              yelpArr.push(data.businesses[i])

            };
            console.log(data.businesses.length)
            console.log(data.businesses[0].id)
            console.log(data.businesses[1].id)
            console.log(data.businesses[2].id)
            console.log(data.businesses[3].id)
            console.log(data.businesses[4].id)
                // res.json('d')
               // yelpArr = [];
               // yelpArr.push(data.businesses[i])
                //  // res.json(data.businesses[i])
                //  console.log (yelpArr);
                //  console.log(yelpArr.length)
                  // res.json(yelpArr);


           // res.sendFile(process.cwd()+'/main.html')
           		if (b = data.businesses.length) {
           			res.redirect('/second')
           		};
           	
           // };


          })
          .catch(function (err) {
            console.error(err);
          });
          }

          yelpz();


          });

// -------------------------------------------------------------------------------------------------------------
// Turns geolocation into a street name string
app.get('/api', function(req, res){

	function locater(){
	var geocoderProvider = 'google';
	var httpAdapter = 'https';
// optional 
	var extra = {
    apiKey: 'AIzaSyA32ZoqMzaSzODIPGhEVeZsU1rahWLTOyY', // for Mapquest, OpenCage, Google Premier 
    formatter: null         // 'gpx', 'string', ... 
};
 
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

	geocoder.reverse({lat: locArry[0].lat, lon: locArry[0].lng})
    .then(function(res1) {
    	console.log(res1)
    	var c = 0
    	// res.json(res1)
      strArry = [];
    	strArry.push(res1)
    	c++;
    	if (c > 0) {
    		res.redirect('/')
    	};
    	 
    })
    .catch(function(err) {
        console.log(err);
    });
 
   }

locater();

Loc = strArry[0][0].formattedAddress;

  });

// -------------------------------------------------------------------------------------------------------------
//displays second part
app.get('/display', function(req, res){
res.render(process.cwd()+'/views/layouts/second.handlebars')
  
});
// -------------------------------------------------------------------------------------------------------------
//creates array for geo location 
app.get('/api/loc', function(req, res){
	res.json(locArry);
});
// -------------------------------------------------------------------------------------------------------------
//creates array for string location (locateor) 
app.get('/api/str', function(req, res){
  res.json(strArry);
});
// -------------------------------------------------------------------------------------------------------------
//creats array for yelp
app.get('/api/yelps', function(req, res){
	res.json(yelpArr);
});
// -------------------------------------------------------------------------------------------------------------
//creates 
app.get('/place', function(req, res){
  res.json(Place);
});
// -------------------------------------------------------------------------------------------------------------
app.post('/place', function(req, res){
  var Places = req.body;
  // console.log('loooooook')
  // console.log(Places.place);
  Place=Places.place
  // console.log(Place)

  // console.log(Place.place)



  });
// -------------------------------------------------------------------------------------------------------------

app.get('/uhist', function(req, res){
  res.json(btArry);
});
//-------------------------------------------------------------------------------------------------------------
app.post('/uli', function(req, res){
  var newstuff = req.body;
  console.log(newstuff)
  console.log(newstuff)

  var work = newstuff.fry
  console.log(work);
  console.log('------')
  var k = JSON.parse(work)
  console.log(k[0])
  console.log(k)
  // console.log(newstuff);
  btArry=k;
  console.log(btArry)
   console.log(k)
  });
//-------------------------------------------------------------------------------------------------------------
app.post('/uhist', function(req, res){
  var newid = req.body;
  console.log('loook')
  console.log(newid.uid);
  var stuff = newid.uid
  btArry.push(stuff);
  });

// -------------------------------------------------------------------------------------------------------------

app.get('/loc', function(req, res){
  res.json(Loc);
});
// -------------------------------------------------------------------------------------------------------------
app.post('/loc', function(req, res){
  console.log(req.body)
  var Locs = req.body;
  console.log('a;ls,ax,la,als,saxlx,aslx,sax,xasl,alx;x,')

  if (Loc == strArry) {
  console.log(Locs.loc);
  Loc=Locs.loc

}else{
  console.log('yaaaaay')
}


  // console.log(Place.place)



  });
// -------------------------------------------------------------------------------------------------------------
app.post('/api/loc', function(req, res){
	var newPerson = req.body;
	console.log('ayyy lmao')
	console.log(newPerson);
  locArry = [];
	locArry.push(newPerson);
	res.redirect('/api')
	});
//-------------------------------------------------------------------------------------------------------------
//wipes out seach history (all history)
app.get('/clear', function(req, res){
Loc = "";
Place = "";
pos = "";
locArry = [];
yelpArr = [];
strArry = [];
 
});
app.get('/second', function(req, res){
res.render('second');
 
});


var port = process.env.PORT || 3000;
app.listen(port);
