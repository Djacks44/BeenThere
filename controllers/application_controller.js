var express = require('express');
var router  = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var request = require('request');
var mongojs = require('mongojs');
var databaseUrl = "mongodb://dvac:snowman@ds035583.mlab.com:35583/heroku_jmhqwxzw?authMode=scram-sha1&rm.tcpNoDelay=true";
var collections = ["users"];









var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});

router.get('/', function(req, res) {
	var object = {
		logged_in: req.session.logged_in,
        id: req.session.user_id,
        name: req.session.user_email
	}
  console.log(req.session.user_email)
  res.render('home', object);
});
// -------------------------------------------------------------------------------------------------------------
// shows first route

//gets yelp info
router.get('/yelp', function(req, res){
	var btArry;
	var Place;
	var Loc;
  var yelpArr = [];

	var name = req.session.user_email
  console.log(name)

      db.users.find({
        'name': name
    }, function(err, found){
        if (err) {
            console.log(err);
            res.send(err);
        } else {
          console.log(found)
          console.log(found[0].btArry, found[0].Place, found[0].Loc, "heyejdamkanjkaxsxksl")
          function blue(){
            Loc = found[0].Loc
          };
              blue();
            if (Loc === found[0].Loc) {
            console.log(Loc)
            btArry = found[0].btArry
            Place = found[0].Place

            yelpz();
          }else{
            blue();
          }
        }
    });

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
            

                db.users.update({
                    'name': name
                  }, {
                    $set: {
                            'YelpArr': yelpArr,
                    }
                  }, function(err, edited) {
                    if (err) {
                      console.log(err);

                    } else {
                      console.log(edited);

                    }
                  });


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

          


          });

// -------------------------------------------------------------------------------------------------------------
// Turns geolocation into a street name string
router.get('/api', function(req, res){
	var strArry = [];
  var locArry;
	var c = 0;

var name = req.session.user_email
  db.users.find({
        'name': name
    }, function(err, found){
        if (err) {
            console.log(err);
            res.send(err);
        } else {
          console.log(found)
          console.log(found[0].LocArry,"heyejdamkanjkaxsxksl")
            locArry = found[0].LocArry
            locater();
        }
    });

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
    	
    	// res.json(res1)
      strArry = [];
    	strArry.push(res1)
    	c++;
if (c >0) {
  console.log('jskdbconinadcnilddamlsmxalsmxalsmkxaslmxakxsxlaxmsmkl')

var loc = strArry[0][0].formattedAddress;

console.log(loc)

 var name = req.session.user_email


      db.users.update({
          'name': name
        }, {
          $set: {
                  'Loc': loc,
          }
        }, function(err, edited) {
          if (err) {
            console.log(err);

          } else {
            console.log(edited);

          }
        });

      
        res.redirect('/')
      };

      	 
    })
    .catch(function(err) {
        console.log(err);
    });
 
   }



  });

// -------------------------------------------------------------------------------------------------------------
//displays second part
router.get('/display', function(req, res){
res.render(process.cwd()+'/views/layouts/second.handlebars')
  
});
// -------------------------------------------------------------------------------------------------------------
//creates array for geo location 
router.get('/api/loc', function(req, res){
	var name = req.session.user_email

      db.users.findOne({
        'name': name
    }, function(err, found){
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(found.LocArry);
            res.json(found.LocArry);
        }
    });
});
// -------------------------------------------------------------------------------------------------------------
//creates array for string location (locateor) 
// router.get('/api/str', function(req, res){
//   res.json(strArry);
// });
// -------------------------------------------------------------------------------------------------------------
//creats array for yelp
router.get('/api/yelps', function(req, res){
	  var name = req.session.user_email

      db.users.findOne({
        'name': name
    }, function(err, found){
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(found.YelpArr);
            res.json(found.YelpArr);
        }
    });
});
// -------------------------------------------------------------------------------------------------------------
//creates 
router.get('/place', function(req, res){
  var name = req.session.user_email

      db.users.findOne({
        'name': name
    }, function(err, found){
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(found.Place);
            res.json(found.Place);
        }
    });
});
// -------------------------------------------------------------------------------------------------------------
router.post('/place', function(req, res){
  var Places = req.body;
  // console.log('loooooook')
  // console.log(Places.place);
  var Place1=Places.place

 var name = req.session.user_email

  			db.users.update({
			    'name': name
			  }, {
			    $set: {
			            'Place': Place1 ,
			    }
			  }, function(err, edited) {
			    if (err) {
			      console.log(err);

			    } else {
			      console.log(edited);
			    }
			  });


  });
// -------------------------------------------------------------------------------------------------------------

router.get('/uhist', function(req, res){
var name = req.session.user_email

      db.users.findOne({
        'name': name
    }, function(err, found){
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(found.btArry);
            res.send(found.btArry);
        }
    });
});
//-------------------------------------------------------------------------------------------------------------
router.post('/uhist', function(req, res){
var name = req.session.user_email
  var newid = req.body;
  console.log('loook')
  console.log(newid.uid);
  var stuff = newid.uid

  			db.users.update({
			    'name': name
			  }, {
			    $push: {
			            'btArry': stuff,
			    }
			  }, function(err, edited) {
			    if (err) {
			      console.log(err);

			    } else {
			      console.log(edited);
			    }
			  });
  });

// -------------------------------------------------------------------------------------------------------------

router.get('/loc', function(req, res){
  res.json(Loc);
});
// -------------------------------------------------------------------------------------------------------------
router.post('/loc', function(req, res){

  console.log(req.body)
  var loca;
  var Locs = req.body;
  console.log('a;ls,ax,la,als,saxlx,aslx,sax,xasl,alx;x,')

  var name = req.session.user_email

      db.users.findOne({
        'name': name
    }, function(err, found){
        if (err) {
            console.log(err);
            res.send(err);
        } else {
          console.log(found.Loc)
            loca = found.Loc

  if (loca == undefined) {

  console.log(Locs.loc, "hey");
  var Loce=Locs.loc

        db.users.update({
          'name': name
        }, {
          $set: {
                  'Loc': Loce ,
          }
        }, function(err, edited) {
          if (err) {
            console.log(err);

          } else {
            console.log(edited);
          }
        });


}else{
  console.log('yaaaaay')
}


        }
    });






  // console.log(Place.place)



  });
// -------------------------------------------------------------------------------------------------------------
router.post('/api/loc', function(req, res){
  var locArry;
	var location = req.body;
	console.log('ayyy lmao')
	console.log(location);
  locArry = [];
	locArry.push(location);

    var name = req.session.user_email

                db.users.update({
                    'name': name
                  }, {
                    $set: {
                            'LocArry': locArry,
                    }
                  }, function(err, edited) {
                    if (err) {
                      console.log(err);

                    } else {
                      console.log(edited);

                    }
                  });


	res.redirect('/api')
	});
//-------------------------------------------------------------------------------------------------------------
//wipes out seach history (all history)
router.get('/clear', function(req, res){

    var name = req.session.user_email
 db.users.update({
          'name': name
        }, {
          $unset: {
                  'Loc': 1,
          }
        }, function(err, edited) {
          if (err) {
            console.log(err);

          } else {
            console.log(edited);
          }
        });

   db.users.find({
        'name': name
    }, function(err, found){
        if (err) {
            console.log(err);
            res.send(err);
        } else {
          console.log('Loooooooooook')
          console.log(found)
        }
    });





res.redirect('/')
 
});
router.get('/second', function(req, res){
res.render('second');
 
});
//-------------------------------------------------------------------------------------------------------------
// router.post('/uli', function(req, res){
//   var newstuff = req.body;
//   console.log(newstuff)
//   console.log(newstuff)

//   var work = newstuff.fry
//   console.log(work);
//   console.log('------')
//   var k = JSON.parse(work)
//   console.log(k[0])
//   console.log(k)
//   // console.log(newstuff);
//   var name = req.session.user_email

// 			db.users.update({
// 			    'name': name
// 			  }, {
// 			    $set: {
// 			            'btArry': k,
// 			    }
// 			  }, function(err, edited) {
// 			    if (err) {
// 			      console.log(err);

// 			    } else {
// 			      console.log(edited);
// 			    }
// 			  });
//   });







module.exports = router;
