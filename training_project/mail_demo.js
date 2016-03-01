var sendgrid  = require('sendgrid')("admin_kanban",'deepak216');
var send_grid = function(options) {

	sendgrid.send(options, function(err, json) {
	  if (err) {  console.error(err); }
	  console.log(json);
	});
}
module.exports=send_grid;


// <a href="http://192.168.100.15:3000/user/verifyemail/"+email + "/" + verification_code></a>