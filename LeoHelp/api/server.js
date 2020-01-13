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

// Add a new user
LeoHelp.route('/addUser').post(function(req, res) {
    let cr = new user(req.body);
    cr.save()
        .then(cr => {
            res.status(200).json({'message ': cr.user_name + " added successfully"});
        })
        .catch(err => {
            res.status(400).json({Error: "Error adding new user"});
        });
    });

// Add a new DRO
LeoHelp.route('/addDRO').post(function(req, res) {
    let cr = new DRO(req.body);
    cr.save()
        .then(cr => {
            res.status(200).json({'message ': cr.name + " added successfully"});
        })
        .catch(err => {
            res.status(400).json({Error: "Error adding new user"});
        });
    });

// View all users
LeoHelp.route('/allUsers').get(function(req, res) {
    user.find(function(err, user) {
	if(err) {
	    console.log(err);
	} else {
	    res.status(200).json(user);
	}
    });
});

// View all DROs
LeoHelp.route('/allDROs').get(function(req, res) {
    DRO.find(function(err, DRO) {
	if(err) {
	    console.log(err);
	} else {
	    res.status(200).json(DRO);
	}
    });
});

// Delete all users
LeoHelp.route('/deleteAllUsers').delete( async (req, res) => {
	await user.remove({});
    res.status(200).json({'result ': " All users deleted successfully"});  
});

// Delete all DROs
LeoHelp.route('/deleteAllDROs').delete( async (req, res) => {
	await DRO.remove({});
    res.status(200).json({'result ':  " All DROs deleted successfully"});  
});

// Mark a user in trouble
LeoHelp.route('/markTrouble').post( async (req, res) => {
	try{
		 let data = await user.findOne({user_name : req.body.user_name });
		 data = _.extend(data, req.body);
		 
		/*
			Code to trigger authority, contacts
		*/

		let start = "http://api.opencagedata.com/geocode/v1/json?key=4a4590286e2c474ca287e179cd718be9&q=";
		let mid = "%2C+";
		let end = "&pretty=1&no_annotations=1";
		let url = start + req.body.latitude + mid + req.body.longitude + end;
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
		    });
		 data.inTrouble = true;
		 data.longitude = req.body.longitude;
		 data.latitude = req.body.latitude;
		 data.area = formatted;
		 data.save();
		 console.log(data);
	}
	catch(e){
		res.status(400).json({Error: "Error marking user in trouble"});
	}
	res.status(200).json({'message ' : req.body.user_name + " is marked introuble at latitude " + req.body.latitude + " and " + req.body.longitude});	
});

// Unmark inTrouble (false) for an user
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
		res.status(400).json({Error: "Error unmarking user"});
	}
	res.status(400).json({'message ' : req.body.user_name + " is unmarked "});	
});