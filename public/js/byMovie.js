$(function() {

	
	var d = new Date();

	$('#yearSelect').datepicker({
		  format: "yy", // Notice the Extra space at the beginning
		  viewMode: "years", 
		  minViewMode: "years",
		  autoclose: true
	}).on('changeDate', function(e){
		getStatisticByMovie('byYear','year',e.format('yy'));

    });
	
	$('#monthSelect').datepicker({
		  format: "yy-mm", // Notice the Extra space at the beginning
		  viewMode: "months", 
		  minViewMode: "months",
		  autoclose: true
	}).on('changeDate', function(e){
		getStatisticByMovie('byMonth','month',e.format('yy-mm'));
    });
	
	$('#daySelect').datepicker({
		  format: "yy-mm-dd", // Notice the Extra space at the beginning
		  autoclose: true
	}).on('changeDate', function(e){
		getStatisticByMovie('byDay','day',e.format('yy-mm-dd'));
    });
	
	getStatisticByMovie('byYear','year',d.toISOString().substr(2,2));
	getStatisticByMovie('byMonth','month',d.toISOString().substr(2,5));
	getStatisticByMovie('byDay','day',d.toISOString().substr(2,8));
	
	

		  
});


function getStatisticByMovie(element,criteria,date){

	$.get( "/statistics/byMovie",{ criteria:criteria,date:date}).done(function( data ) {
		Morris.Bar({
			  element: element,
			  data: data,
			  xkey: 'NAME',
			  ykeys: ['SUM','COUNT'],
			  labels: ['총 판매액', '예매횟수']
			});
	});
	
}
