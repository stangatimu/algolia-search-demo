const mongoose = require('mongoose'),
mongooseAlgolia = require("mongoose-algolia");

//define the product schema
const productSchema = mongoose.Schema({
    name: {type:String, required: true},

    //pass id from your category models
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    
    //pass id from your user models
	author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	image: {type: String, required: true},
	description: {type: String, required: true},
	created:{type: Date, default: Date.now},
});

//set a mongoose algolia as a plugin for this schema
productSchema.plugin(mongooseAlgolia,{
	appId: process.env.appId,
	apiKey:process.env.apiKey,
	indexName: process.env.indexName,
    selector:'name image author category Price',
    //set what to populate
	populate: {
		path:'author category',
		select:'name description'
	},
	defaults:{
		author: 'unknown'
	}
});

//product model
let Model = mongoose.model('Product', productSchema);

//To sync every item to algolia api
Model.SyncToAlgolia();

Model.SetAlgoliaSettings({
    //To set product fields to look for keywords
	searchableAttributes: ['name','description','category','subcategory'] 
  });
module.exports = Model