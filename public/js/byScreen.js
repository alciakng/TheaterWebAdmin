$(function() {

	var d = new Date();
	
	$( "#chooseYear" ).datepicker({
	      showWeek: true,
	      firstDay: 1
	});
	
	getStatisticByScreen('byYear','year',d.toISOString().substr(2,2));
	getStatisticByScreen('byMonth','month',d.toISOString().substr(2,5));
	getStatisticByScreen('byDay','day',d.toISOString().substr(2,8));


		   
});


function getStatisticByScreen(element,criteria,date){

	$.get( "/statistics/byScreen",{ criteria:criteria,date:date}).done(function( data ) {
		Morris.Bar({
			  element: element,
			  data: data,
			  xkey: 'SCREENNAME',
			  ykeys: ['SUM','COUNT'],
			  labels: ['총 판매액', '예매횟수']
			});
	});
	
}

