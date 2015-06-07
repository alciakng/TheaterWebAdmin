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
		
		/*
		Morris.Donut({
			  element: element,
			  data: [
			         {label: (data[0]?data[0].LABEL : '남'), value: (data[0]? data[0].VALUE : 0 )},
			         {label: (data[1]?data[1].LABEL : '여'), value: (data[1]? data[1].VALUE : 0 )}
			       ]
			});
		*/
		
		var chart = AmCharts.makeChart( element, {
			  "type": "pie",
			  "theme": "light",
			  "path": "http://www.amcharts.com/lib/3/",
			  "titles": [ {
			    "text": "성별통계",
			    "size": 40
			  } ],
			  "dataProvider": data,
			  "valueField": "VALUE",
			  "titleField": "LABEL",
			  "startEffect": "elastic",
			  "startDuration": 2,
			  "labelRadius": 15,
			  "innerRadius": "50%",
			  "depth3D": 10,
			  "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
			  "angle": 15,
			  "export": {
			    "enabled": true
			  }
			} );
			
		jQuery( '.chart-input' ).off().on( 'input change', function() {
			  var property = jQuery( this ).data( 'property' );
			  var target = chart;
			  var value = Number( this.value );
			  chart.startDuration = 0;

			  if ( property == 'innerRadius' ) {
			    value += "%";
			  }

			  target[ property ] = value;
			  chart.validateNow();
			} );
	});
	
}
