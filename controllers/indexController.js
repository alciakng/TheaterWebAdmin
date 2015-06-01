/**
 * New node file
 */



var dbConfig = config('dbconfig.js');
var oracledb = require('oracledb');
//get parameter를 얻어내기 위한 모듈
var url = require('url');

exports.authPage = function(req,res){
	res.render('index/auth');
}

exports.auth = function(req,res){
	var code = req.body.code;
	
	if(code!='1234')
		res.redirect('/');
	else {
		req.session
		res.redirect('/index');
	}
	
	
}



exports.index = function(req,res){
	
	var select_movies = "select * from movie";
	
	oracledb.getConnection(dbConfig,
			function(err,connection){
				 if (err) {
				      console.error(err.message);
				      return;
				 }
				 connection.execute(select_movies,[],{outFormat:oracledb.OBJECT},function(err,result){
					if(err){
						console.error(err.message);
						return;
					} 
						connection.release(function(err){
							if(err){
								console.error(err.message);
								return;
							}
							console.log(req.body);
							console.log("영화불러오기 성공");
							res.render('index/index',{movies: result.rows});
						})
	
				 });
	});
	
	
}

