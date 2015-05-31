/**
 * New node file
 */


var indexController = controllers('indexController.js');
var statisticsController = controllers('statisticsController.js');
var movieController = controllers('movieController.js');
var timeController = controllers('timeController.js');

module.exports = function(app){
	
	//index-router
	    app.get('/',indexController.authPage);
	    app.post('/auth',indexController.auth)
		app.get('/index',indexController.index);
	
	//statistics-router
		//app.get('/statistics/byAge',statisticsController.byAge);
		//app.get('/statistics/bySex',statisticsController.bySex);
		app.get('/statistics/byPeriodPage',statisticsController.byPeriodPage);
		app.get('/statistics/byPeriod',statisticsController.byPeriod);
		app.get('/statistics/byMoviePage',statisticsController.byMoviePage);
		app.get('/statistics/byMovie',statisticsController.byMovie);
		app.get('/statistics/bySexPage',statisticsController.bySexPage);
		app.get('/statistics/bySex',statisticsController.bySex);
		app.get('/statistics/byScreenPage',statisticsController.byScreenPage);
		app.get('/statistics/byScreen',statisticsController.byScreen);
		
	//movie-router
		app.get('/movie/addPage',movieController.addPage);
		app.get('/movie/deletePage',movieController.deletePage);
		app.get('/movie/modifyPage',movieController.modifyPage);
		app.post('/movie/addMovie',movieController.addMovie);
		app.post('/movie/modifyMovie',movieController.modifyMovie);
		app.post('/movie/deleteMovie',movieController.deleteMovie);
		
    //time-router
		app.get('/time/addPage',timeController.addPage);
		app.get('/time/modifyPage',timeController.modifyPage);
		app.get('/time/deletePage',timeController.deletePage);
		app.post('/time/addTime',timeController.addTime);
		//app.post('/time/modifyTime',timController.modifyTime);
		//app.post('/time/deleteTime',timController.deleteTime);
		
};