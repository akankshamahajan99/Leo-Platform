const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let area = new Schema({ 
    name : {
        type : String
    },
    crimes : [String],
    minlongitude: {
        type : Number
    },
    maxlongitude: {
        type : Number
    },
    minlatitude : {
        type : Number
    },
    maxlatitude : {
        type : Number
    }
});

let crime = new Schema({
    name : {
	   type: String
    },
    description: {
	   type: String
    },
    precautions : [String]
});

let application = new Schema({
    user_name: {
	type: String
    },
    startup_name: {
	type: String
    },
    status: {
	type: Number
    }
});
area = mongoose.model('area', area);
crime = mongoose.model('crime', crime);
application = mongoose.model('application', application);
var my_schemas = {'area': area, 'crime': crime, 'application': application};
module.exports = my_schemas;

/*
LeoMine.route('/addCrime').post(function(req, res) {
    let cr = new crime(req.body);
    cr.save()
        .then(usr => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).json({Error: "Error Adding New User"});
        });
    });
*/