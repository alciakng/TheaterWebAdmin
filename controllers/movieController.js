/**
 * New node file
 */
var dbConfig = config('dbconfig.js');
var oracledb = require('oracledb');
//get parameter를 얻어내기 위한 모듈
var url = require('url');


exports.addPage =function(req,res){
	
	res.render('movie/addMovie');
}

exports.addMovie = function(req,res){

		console.log("영화등록");
		//영화추가
		var add_movie = "begin ADDMOVIE(:name,:genre,:runningtime,:director,:rating,:company,:country,:actors,:image,to_date(:opendate,'yy-mm-dd'),:summary);END;"
  	
		
		oracledb.getConnection(dbConfig,
				function(err,connection){
					 if (err) {
					      console.error(err.message);
					      return;
					 }
					 connection.execute(add_movie,req.body,function(err,result){
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
								res.redirect('movie/addPage');
							})
		
					 });
		});

}

exports.modifyPage = function(req,res){
	
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
							console.log("영화 삭제페이지");
							
							res.render('movie/modifyMovie',{movies:result.rows});
						})
	
				 });
	});
}

exports.modifyMovie = function(req,res){
	
	var update_movie ="update movie set ";
	
	console.log(req.body);
	if(req.body.name) update_movie+="name ='"+req.body.name+"',";
	if(req.body.genre) update_movie+="genre ='"+req.body.genre+"',";
	if(req.body.runningtime) update_movie+="runningtime ='"+req.body.runningtime+"',";
	if(req.body.director) update_movie+="director ='"+req.body.director+"',";
	if(req.body.rating) update_movie+="rating ='"+req.body.rating+"',";
	if(req.body.company) update_movie+="company ='"+req.body.company+"',";
	if(req.body.country) update_movie+="country ='"+req.body.country+"',";
	if(req.body.actors) update_movie+="actors ='"+req.body.actors+"',";
	if(req.body.image) update_movie+="image ='"+req.body.image+"',";
	if(req.body.opendate) update_movie+="opendate =to_date('"+req.body.opendate+"','yy-mm-dd'),";
	if(req.body.summary) update_movie+="summary ='"+req.body.summary+"',";
	
	update_movie=update_movie.substr(0,update_movie.length-1);
	update_movie+=" where moviecode=:moviecode";
	
	console.log(update_movie);
	
	oracledb.getConnection(dbConfig,
			function(err,connection){
				 if (err) {
				      console.error(err.message);
				      return;
				 }
				 connection.execute(update_movie,[req.body.moviecode],{autoCommit:true},function(err,result){
					if(err){
						console.error(err.message);
						return;
					} 
						connection.release(function(err){
							if(err){
								console.error(err.message);
								return;
							}
							console.log("영화수정완료");
							res.redirect('movie/modifyPage');
						})
	
				 });
	});
	
}

exports.deletePage = function(req,res){
	
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
							console.log("영화 삭제페이지");
							
							res.render('movie/deleteMovie',{movies:result.rows});
						})
	
				 });
	});
	
}

exports.deleteMovie = function(req,res){
	
	//현재 무결성 제약조건 연쇄삭제 설정안되어있음.. 연쇄삭제 delete on cascade 설정해야함
	var delete_movie ="delete from movie where moviecode=:moviecode";
	
	oracledb.getConnection(dbConfig,
			function(err,connection){
				 if (err) {
				      console.error(err.message);
				      return;
				 }
				 connection.execute(delete_movie,[req.body.moviecode],{autoCommit:true},function(err,result){
					if(err){
						console.error(err.message);
						return;
					} 
						connection.release(function(err){
							if(err){
								console.error(err.message);
								return;
							}
							console.log("영화삭제완료");
							res.redirect('movie/deletePage');
						})
	
				 });
	});
	
	
}