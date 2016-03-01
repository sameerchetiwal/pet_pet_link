var mongoose=require('mongoose');

var postSchema=mongoose.Schema(
{
	postedBy: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'userData'
	}],
	title: {type:String, required:true},
	creatorImage: {type:String},
	creatorName: {type:String},
	createdOn: Date,
	postImage: String,
	catType: {type:String, required:true},
	comments: [{creator: {type: mongoose.Schema.Types.ObjectId,ref: 'userData'}, createdOn: Date, comment: String}],
	commentCount: Number,
	likeBy: [],
	likeCount: Number,
	unlikeCount: Number,
	flagCount: Number,
	flagBy:[],
	favourite: Boolean
},{collection:'postData'});

var postData=mongoose.model('PostData',postSchema);

module.exports=postData;
