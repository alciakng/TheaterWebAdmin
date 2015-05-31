$(function() {

	var d = new Date();
	
	$('#yearSelect').datepicker({
		  format: "yy", // Notice the Extra space at the beginning
		  viewMode: "years", 
		  minViewMode: "years",
		  autoclose: true
	}).on('changeDate', function(e){
		$('#byYear').empty();
		getStatisticBySex('byYear','year',e.format('yy'));

  });
	
	$('#monthSelect').datepicker({
		  format: "yy-mm", // Notice the Extra space at the beginning
		  viewMode: "months", 
		  minViewMode: "months",
		  autoclose: true
	}).on('changeDate', function(e){
		$('#byMonth').empty();
		getStatisticBySex('byMonth','month',e.format('yy-mm'));
  });
	
	$('#daySelect').datepicker({
		  format: "yy-mm-dd", // Notice the Extra space at the beginning
		  autoclose: true
	}).on('changeDate', function(e){
		$('#byDay').empty();
		getStatisticBySex('byDay','day',e.format('yy-mm-dd'));
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
