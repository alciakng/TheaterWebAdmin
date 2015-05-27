$(function() {

	
	var d = new Date();
	
	$( "#chooseYear" ).datepicker({
	      showWeek: true,
	      firstDay: 1
	});
	
	
	
	getStatisticByPeriod('byYear','year','');
	getStatisticByPeriod('byMonth','month',d.toISOString().substr(2,5));
	getStatisticByPeriod('byDay','day',d.toISOString().substr(2,8));
	
	

});


function getStatisticByPeriod(element,criteria,date){

	$.get( "/statistics/byPeriod",{ criteria:criteria,date:date}).done(function( data ) {
		Morris.Line({
			  element: element,
			  data: data,
			  xkey: 'YEAR',
			  ykeys: ['SUM','COUNT'],
			  labels: ['총 판매액', '예매횟수']
			});
	});
	
}
