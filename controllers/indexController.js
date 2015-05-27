/**
 * New node file
 */

exports.index = function(req,res){
	res.render('index');
}


exports.statistics = function(req,res){
	
	res.render('morris');
}