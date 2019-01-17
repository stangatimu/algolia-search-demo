const express = require('express'),
 app = express(),
 morgan = require('morgan'),
 bodyparser = require("body-parser"),
 mongoose = require('mongoose'),
 helmet = require('helmet');

//import search routes
const searchRoutes = require('./api/routes/search');
app.set('trust proxy', +1);
app.use(helmet());
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
mongoose.connect(process.env.database,()=>{
	console.log("connected to mlab");
});

//set CORS to allow request from all origins
app.use((req, res, next)=>{
    //allow anyone i.e "*"
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
	if (req.body === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods','PUT, POST, DELETE, GET, PATCH');
		return res.status(200).json({});
	}
	next();
});

//set entry point of search routes
app.use('/search', searchRoutes);


app.use((req,res, next)=>{
	const error = new Error('Not found');
	error.status = 404;
	next(error);
})
app.use((error,req,res,next)=>{
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
	});
});
module.exports = app;