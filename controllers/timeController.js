/**
 * New node file
 */

var dbConfig = config('dbconfig.js');
var oracledb = require('oracledb');


exports.addPage =function(req,res){
	
	var select_screens = 'select * from screen';
	var select_movies = 'select * from movie';
	
	oracledb.getConnection(dbConfig,
			function(err,connection){
				 if (err) {
				      console.error(err.message);
				      return;
				 }
				 connection.execute(select_screens,[],{outFormat:oracledb.OBJECT},function(err,result1){
					if(err){
						console.error(err.message);
						return;
					} 
					connection.execute(select_movies,[],{outFormat:oracledb.OBJECT},function(err,result2){
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
							console.log("영화등록성공");
							res.render('time/addTime',{screens:result1.rows,movies:result2.rows});
						});
						
					})
					
	
				 });
	});
	
	
	

	
}

exports.addTime = function(req,res){
	
	var add_time = "BEGIN ADDTIMEPROC(:screencode,:moviecode,to_date(:moviedate,'yy-mm-dd'),:starttime,:endtime); END;";
	
	var bindvars = req.body;
	console.log(req.body);
	console.log(bindvars);
	oracledb.getConnection(dbConfig,
			function(err,connection){
				 if (err) {
				      console.error(err.message);
				      return;
				 }
				 connection.execute(add_time,bindvars,function(err,result){
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
							console.log("일정등록 프로시저가 정상적으로 실행되었음");
							res.render('time/addTime');
						});
	
				 });
	});

};
exports.modifyPage =function(req,res){

	res.render('time/modifyTime');
}

exports.deletePage =function(req,res){
	
	res.render('time/deleteTime');
}