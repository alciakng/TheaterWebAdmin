/**
 * New node file
 */

var dbConfig = config('dbconfig.js');
var oracledb = require('oracledb');
//get parameter를 얻어내기 위한 모듈
var url = require('url');


exports.byPeriodPage =function(req,res){
	
	res.render('statistics/byPeriod');
}

exports.byPeriod =function(req,res){

	var year_period = "select count(b.totalprice) as count,sum(b.totalprice) as sum,TO_CHAR(t.moviedate,'yy') as year from booking b, time t where t.timecode =b.timecode group by TO_CHAR(t.moviedate,'yy')";
	var month_period = "select count(b.totalprice) as count,sum(b.totalprice) as sum,TO_CHAR(t.moviedate,'mm') as month from booking b, time t where t.timecode =b.timecode and TO_CHAR(t.moviedate,'yy')=:y group by TO_CHAR(t.moviedate,'mm')";
	var day_period ="select count(b.totalprice) as count,sum(b.totalprice) as sum,TO_CHAR(t.moviedate,'dd') as day from booking b, time t where t.timecode =b.timecode and TO_CHAR(t.moviedate,'yy-mm')=:ym group by TO_CHAR(t.moviedate,'dd')";
		
	var sql;
	var bindvars = {};
	
	
	switch(req.param('criteria')){
		case 'YEAR':
			console.log('year');
			sql = year_period;
			break;
		case 'MONTH':
			console.log('month');
			sql = month_period;
			bindvars.y=req.param('date');
			break;
		case 'DAY':
			console.log('day');
			sql = day_period;
			bindvars.ym=req.param('date');
			break;
	}
	
	console.log(bindvars);
	
	oracledb.getConnection(dbConfig,
			function(err,connection){
				 if (err) {
				      console.error(err.message);
				      return;
				 }
				 connection.execute(sql,bindvars,{outFormat:oracledb.OBJECT},function(err,result){
					 if (err) {
						  console.log("기간별 통계 불러오기 에러");
					      console.error(err.message);
					      return;
					 }
					 connection.release(function(err){
						 if(err){
							 console.log("기간별 통계 불러올때 릴리스 에러");
							 console.err(err.messge);
							 return; 
						 }
						 console.log(result.rows);
						 res.send(result.rows);
					 });
					 
				 });
	});
	
}



exports.byMoviePage =function(req,res){
	
	res.render('statistics/byMovie');
}

exports.byMovie =function(req,res){

	var movie_by_year = "select m.name,count(b.totalprice) as count ,sum(b.totalprice) as sum from time t,booking b,movie m where b.moviecode = m.moviecode and t.timecode=b.timecode and TO_CHAR(t.moviedate,'yy')=:y  group by m.name";
	var movie_by_month = "select m.name,count(b.totalprice) as count ,sum(b.totalprice) as sum from time t,booking b,movie m where b.moviecode = m.moviecode and t.timecode=b.timecode and TO_CHAR(t.moviedate,'yy-mm')=:ym  group by m.name";
	var movie_by_day ="select m.name,count(b.totalprice) as count ,sum(b.totalprice) as sum from time t,booking b,movie m where b.moviecode = m.moviecode and t.timecode=b.timecode and TO_CHAR(t.moviedate,'yy-mm-dd')=:ymd  group by m.name";
	
	var sql;
	var bindvars = {};
	
	switch(req.param('criteria')){
	case 'year':
		console.log('year');
		bindvars.y=req.param('date');
		sql = movie_by_year;
		break;
	case 'month':
		console.log('month');
		sql = movie_by_month;
		bindvars.ym=req.param('date');
		break;
	case 'day':
		console.log('day');
		sql = movie_by_day;
		bindvars.ymd=req.param('date');
		break;
	}
	
	console.log(bindvars);
	
	oracledb.getConnection(dbConfig,
			function(err,connection){
				 if (err) {
				      console.error(err.message);
				      return;
				 }
				 connection.execute(sql,bindvars,{outFormat:oracledb.OBJECT},function(err,result){
					 if (err) {
						  console.log("영화별 통계 불러오기 에러");
					      console.error(err.message);
					      return;
					 }
					 connection.release(function(err){
						 if(err){
							 console.log("영화별 통계 불러올때 릴리스 에러");
							 console.err(err.messge);
							 return; 
						 }
						 console.log(result.rows);
						 res.send(result.rows);
					 });
					 
				 });
	});
	
}



exports.byScreenPage =function(req,res){
	
	res.render('statistics/byScreen');
}

exports.byScreen =function(req,res){

	var screen_by_year = "select s.screenname,count(b.totalprice) as count ,sum(b.totalprice) as sum from time t,booking b,screen s where b.screencode = s.screencode and t.timecode=b.timecode and TO_CHAR(t.moviedate,'yy')=:y  group by s.screenname";
	var	screen_by_month = "select s.screenname,count(b.totalprice) as count ,sum(b.totalprice) as sum from time t,booking b,screen s where b.screencode = s.screencode and t.timecode=b.timecode and TO_CHAR(t.moviedate,'yy-mm')=:ym  group by s.screenname";
	var screen_by_day ="select s.screenname,count(b.totalprice) as count ,sum(b.totalprice) as sum from time t,booking b,screen s where b.screencode = s.screencode and t.timecode=b.timecode and TO_CHAR(t.moviedate,'yy-mm-dd')=:ymd  group by s.screenname";
		
	var sql;
	var bindvars = {};
	
	switch(req.param('criteria')){
	case 'year':
		console.log('year');
		sql = screen_by_year;
		bindvars.y=req.param('date');
		break;
	case 'month':
		console.log('month');
		sql = screen_by_month;
		bindvars.ym=req.param('date');
		break;
	case 'day':
		console.log('day');
		sql = screen_by_day;
		bindvars.ymd=req.param('date');
		break;
	}
	
	console.log(bindvars);
	
	oracledb.getConnection(dbConfig,
			function(err,connection){
				 if (err) {
				      console.error(err.message);
				      return;
				 }
				 connection.execute(sql,bindvars,{outFormat:oracledb.OBJECT},function(err,result){
					 if (err) {
						  console.log("기간별 통계 불러오기 에러");
					      console.error(err.message);
					      return;
					 }
					 connection.release(function(err){
						 if(err){
							 console.log("기간별 통계 불러올때 릴리스 에러");
							 console.err(err.messge);
							 return; 
						 }
						 console.log(result.rows);
						 res.send(result.rows);
					 });
					 
				 });
	});
	
}


exports.bySexPage =function(req,res){
	
	res.render('statistics/bySex');
}

exports.bySex =function(req,res){

	var sex_by_year = "select  m.sex as label,sum(b.totalprice) as value from booking b, time t,member m where t.timecode =b.timecode and m.email=b.email and TO_CHAR(t.moviedate,'yy')=:y group by m.sex";
	var sex_by_month = "select  m.sex as label,sum(b.totalprice) as value from booking b, time t,member m where t.timecode =b.timecode and m.email=b.email and TO_CHAR(t.moviedate,'yy-mm')=:ym group by m.sex";
	var sex_by_day ="select  m.sex as label,sum(b.totalprice) as value  from booking b, time t,member m where t.timecode =b.timecode and m.email=b.email and TO_CHAR(t.moviedate,'yy-mm-dd')=:ymd group by m.sex";
		
	var sql;
	var bindvars = {};
	
	switch(req.param('criteria')){
	case 'year':
		console.log('year');
		sql = sex_by_year;
		bindvars.y=req.param('date');
		break;
	case 'month':
		console.log('month');
		sql = sex_by_month;
		bindvars.ym=req.param('date');
		break;
	case 'day':
		console.log('day');
		sql = sex_by_day;
		bindvars.ymd=req.param('date');
		break;
	}
	
	console.log(bindvars);
	
	oracledb.getConnection(dbConfig,
			function(err,connection){
				 if (err) {
				      console.error(err.message);
				      return;
				 }
				 connection.execute(sql,bindvars,{outFormat:oracledb.OBJECT},function(err,result){
					 if (err) {
						  console.log("성별 통계 불러오기 에러");
					      console.error(err.message);
					      return;
					 }
					 connection.release(function(err){
						 if(err){
							 console.log("성별 통계 불러올때 릴리스 에러");
							 console.err(err.messge);
							 return; 
						 }
						 console.log(result.rows);
						 res.send(result.rows);
					 });
					 
				 });
	});
	
}
