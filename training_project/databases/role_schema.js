var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/user_database');

var roleSchema=mongoose.Schema({
	name: String,
	actions: []
},{collection:'roleData'});

var roleData=mongoose.model('RoleData',roleSchema);
module.exports.role=roleData;
