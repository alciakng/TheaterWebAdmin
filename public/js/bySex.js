$(function() {

	var d = new Date();
	
	$( "#chooseYear" ).datepicker({
	      showWeek: true,
	      firstDay: 1
	});
	
	getStatisticBySex('byYear','year',d.toISOString().substr(2,2));
	getStatisticBySex('byMonth','month',d.toISOString().substr(2,5));
	getStatisticBySex('byDay','day',d.toISOString().substr(2,8));
	

		   
});

function getStatisticBySex(element,criteria,date){

	$.get( "/statistics/bySex",{ criteria:criteria,date:date}).done(function( data ) {
		Morris.Donut({
			  element: element,
			  data: [
			         {label: "남", value: (data[0]? data[0].VALUE : 0 )},
			         {label: "여", value: (data[1]? data[1].VALUE : 0 )}
			       ]
			});
	});
	
}
