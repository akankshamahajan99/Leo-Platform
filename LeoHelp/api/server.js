const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4001;
const LeoHelp = express.Router()
const fetch = require('node-fetch');

var fs = require('fs');

const schemas = require('./db.model');

user = schemas.user;
DRO = schemas.DRO;

app.use(cors());
app.use(bodyParser.json());
app.use('/LeoHelp', LeoHelp);

mongoose.connect('mongodb://127.0.0.1:27017/Leo', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, () => {
    console.log('App running on port $(PORT)');
});


LeoHelp.route('/addUser').post(function(req, res) {
    let cr = new user(req.body);
    cr.save()
        .then(cr => {
            res.status(200).json({'name': cr.name + " added successfully"});
        })
        .catch(err => {
            res.status(400).json({Error: "Error adding new user"});
        });
    });


LeoHelp.route('/addDRO').post(function(req, res) {
    let cr = new DRO(req.body);
    cr.save()
        .then(cr => {
            res.status(200).json({'name': DRO.name + " added successfully"});
        })
        .catch(err => {
            res.status(400).json({Error: "Error adding new user"});
        });
    });

LeoHelp.route('/allUsers').get(function(req, res) {
    user.find(function(err, user) {
	if(err) {
	    console.log(err);
	} else {
	    res.status(200).json(user);
	}
    });
});

LeoHelp.route('/allDRO').get(function(req, res) {
    DRO.find(function(err, DRO) {
	if(err) {
	    console.log(err);
	} else {
	    res.status(200).json(DRO);
	}
    });
});


LeoHelp.route('/deleteAllUsers').delete( async (req, res) => {
	await user.remove({});
    res.status(200).json({'result ': " All users deleted successfully"});  
});

LeoHelp.route('/deleteAllDROs').delete( async (req, res) => {
	await DRO.remove({});
    res.status(200).json({'result ':  " All DROs deleted successfully"});  
});

LeoHelp.route('/markTrouble').post( async (req, res) => {
	try{
		 let data = await user.findOne({user_name : req.body.user_name });
		 data = _.extend(data, req.body);
		 console.log(data);

		/*
			Code to trigger authority, contacts
		*/

		let start = "http://api.opencagedata.com/geocode/v1/json?key=4a4590286e2c474ca287e179cd718be9&q=";
		let mid = "%2C+";
		let end = "&pretty=1&no_annotations=1";
		//console.log((req.body.latitude));
		let url = start + req.body.latitude + mid + req.body.longitude + end;
 		//console.log(url);

		//let url = "http://api.opencagedata.com/geocode/v1/json?key=4a4590286e2c474ca287e179cd718be9&q=19.0728%2C+72.8826&pretty=1&no_annotations=1";

		let settings = { method: "Get" };
	
		await fetch(url, settings)
		    .then(res => res.json())
		    .then((json) => {
		    	
		    	let continent = json.results[0].components.continent;
		    	let country_code = json.results[0].components.country_code;
		    	let country = json.results[0].components.country;
		    	let postcode = json.results[0].components.postcode;
		    	let state = json.results[0].components.state;
		    	let state_district = json.results[0].components.state_district;
		    	
		    	formatted = json.results[0].formatted;
		    	data.area = formatted;
		    	//console.log(formatted);
		    });


		// console.log(data);
		 data.inTrouble = true;
		 data.longitude = req.body.longitude;
		 data.latitude = req.body.latitude;
		 data.area = formatted;
		 data.save();
		 console.log(data);
		 

		 /*
		const dataa = await applications.findByIdAndRemove({
			_id : data._id
		});
		res.send(dataa)*/
	}
	catch(e){

	}
	res.status(200).json({'message ' : req.body.user_name + " is marked introuble at latitude " + req.body.latitude + " and " + req.body.longitude});	
});

LeoHelp.route('/unmarkTrouble').post( async (req, res) => {
	try{
		 let data = await user.findOne({user_name : req.body.user_name });
		 console.log(data);
		 data.inTrouble = false;
		 data.longitude = req.body.longitude;
		 data.latitude = req.body.latitude;
		 data.save();
		 console.log(data);
	}
	catch(e){

	}
	res.status(400).json({'message ' : req.body.user_name + " is unmarked "});	
});

/*
userRoutes.route('/userexists').post(function(req, res) {
    const user_name = req.body.user_name;
    users.find(function(err, usr) {
	if(err) {
	    console.log(err);
	} else {
	    flag = 1;
	    for(index = 0; index < usr.length; index++) {
		if(usr[index].user_name == user_name) {
		    //res.json(user_name + "res");
		    res.status(204).json({UserNameExists : 1});
		    flag = 0;
		    break;
		    //res.json(usr);
		}
		    //res.status(401).json({Success: 0, Error: "Incorrect Password"});
	    }
	    if(flag) {
		//res.status(200).json({UserNameExists: 0});
		res.json(usr);
	    }
	}
    });
});
userRoutes.route('/').post(function(req, res) {
    const user_name = req.body.user_name;
    const password = req.body.password;
    /users.findOne({ user_name }).then(user => {
        if(!user) {
            return res.status(404).json({emailnotfound: "Email not found"});
        }
        if(user.password == password) {
            return res.status(200).json({Success: "Logging In"});
        } else {
            return res.status(400).json({Error: "Incorrect Password"});
        }
    });/
    users.find(function(err, usr) {
	flag = 1;
        if(err) {
            console.log(err);
        } else {
	    //res.json(req.body);
	    for(index = 0; index < usr.length; index++) {
		if(usr[index].user_name == user_name  && usr[index].password == password) {
		//    res.json(user_name + "res");
		    res.status(200).json({Success : 1});
		    flag = 0;
		    break;
		    //res.json(usr);
		}
		    //res.status(401).json({Success: 0, Error: "Incorrect Password"});
	    }
	    if(flag) {
		res.status(401).json({Success: 0, Error: "Incorrect Password"});
	    }
	    //
	    /*
	    if(usr[0].user_name == user_name  && usr[0].password == password) {
		//res.json(user_name + "res");
		res.status(200).json({Success : 1});
		//res.json(usr);
	    } else {
		res.status(401).json({Success: 0, Error: "Incorrect Password"});
	    }
	    /
	    //
        }
    });
});
userRoutes.route('/add').post(function(req, res) {
    let usr = new users(req.body);
    usr.save()
        .then(usr => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).json({Error: "Error Adding New User"});
        });
    });

userRoutes.route('/addstartup').post(function(req, res) {
    let startup = new startups(req.body);
    startup.save()
        .then(startup => {
	    res.status(200).json({'startup': 'startup added successfully'});
	})
        .catch(err => {
	    res.status(400).json({Error: "Error Adding new Startup"});
	});
});*/

/*
//userRoutes.route('/:u')
userRoutes.route('/addapplication').post(function(req, res) {
    let application = new applications(req.body);
    application.save()
        .then(application => {
	    res.status(200).json({'application': 'application added successfully'});
	})
        .catch(err => {
	    res.status(400).json({Error: "Error Adding new Application"});
	});
});

userRoutes.route('/applications').get(function(req, res) {
    applications.find(function(err, application) {
	if(err) {
	    console.log(err);
	} else {
	    res.status(200).json(application);
	}
    });
});


userRoutes.route('/removeapplication').delete( async (req, res) => {
	try{
		 console.log(req.body);

		 let data = await applications.findOne({user_name : req.body.user_name, 
		 			startup_name : req.body.startup_name, 
		 			status : req.body.status });

		 console.log(data)
		const dataa = await applications.findByIdAndRemove({
			_id : data._id
		});
		res.send(dataa)
	}
	catch(e){

	}
});
*/