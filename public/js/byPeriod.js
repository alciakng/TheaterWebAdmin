$(function() {

	
	var d = new Date();
	

	$('#yearSelect').datepicker({
		  format: "yy", // Notice the Extra space at the beginning
		  viewMode: "years", 
		  minViewMode: "years",
		  autoclose: true
	}).on('changeDate', function(e){
		$('#byMonth').empty();
		getStatisticByPeriod('byMonth','MONTH',e.format('yy'));
  });
	
	$('#monthSelect').datepicker({
		  format: "yy-mm", // Notice the Extra space at the beginning
		  viewMode: "months", 
		  minViewMode: "months",
		  autoclose: true
	}).on('changeDate', function(e){
		$('#byDay').empty();
		getStatisticByPeriod('byDay','DAY',e.format('yy-mm'));
  });
	
	
	
	getStatisticByPeriod('byYear','YEAR','');
	getStatisticByPeriod('byMonth','MONTH',d.toISOString().substr(2,2));
	getStatisticByPeriod('byDay','DAY',d.toISOString().substr(2,5));
	
	

});


function getStatisticByPeriod(element,criteria,date){

	$.get( "/statistics/byPeriod",{ criteria:criteria,date:date}).done(function( data ) {

		Morris.Line({
			  element: element,
			  data: data,
			  xkey: criteria,
			  ykeys: ['SUM','COUNT'],
			  labels: ['총 판매액', '예매횟수']
			});
	});
	
}
