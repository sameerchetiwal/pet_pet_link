var mongoose=require('mongoose');

var categorySchema=mongoose.Schema({
	catType: {type: String, required: true},
	catImage: String
},{collection:"categories"});

var category=mongoose.model('category',categorySchema);
module.exports=category;