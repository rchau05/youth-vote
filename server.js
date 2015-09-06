var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		restful = ('node-restful'),
		bcrypt = require('bcrypt');

//importing files from models folders
var User = require('./models/user');

//connect to mongoose
mongoose.connect(
	process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/green'
	);

//configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// get user
app.get('/api/user', function (req, res) {
	User.find({}, function (err, user) {
		res.json(user)
	});
});

// create new user
app.post('/api/user', function (req, res) {
	//create new user from body of request
	var newUser = new User({
		username: req.body.username,
		email: req.body.email, 
		DOB: req.body.dob, 
		password: req.body.password
	});
	//save new user
	newUser.save(function (err, savedUser) {
		res.json(savedUser);
	});
});

// update user
app.put('/api/user/:id', function (req, res) {
	var targetId = req.params.id;
	// find the one user 
	User.findOne({_id:targetId}, function (err, foundUser) {
		// update user or keep the same text
		foundUser.text = req.body.text || foundUser.text;
		// save the updated user
		foundUser.save(function (err, savedUser) {
			res.json(savedUser);
		});
	});
});

// set location for static files
app.use(express.static(__dirname + '/public'));

// load public/index.html file (angular app)
app.get('*', function (req, res) {
 res.sendFile(__dirname + '/public/views/index.html');
});

//listen on port 3000
app.listen(process.env.PORT || 3000, function() {
	console.log('server started on 0.0.0.0:3000')
})