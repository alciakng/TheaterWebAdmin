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
/*
		Morris.Line({
			  element: element,
			  data: data,
			  xkey: criteria,
			  ykeys: ['SUM','COUNT'],
			  labels: ['총 판매액', '예매횟수']
			});
			*/
		
		
		var chart = AmCharts.makeChart(element, {
		    "theme": "light",
		    "type": "serial",
			"startDuration": 2,
		    "path": "http://www.amcharts.com/lib/3/",
		    "dataProvider": data,
		    "valueAxes": [{
		        "position": "left",
		        "axisAlpha":0,
		        "gridAlpha":0         
		    }],
		    "graphs": [{
		        "balloonText": "[[category]]: <b>[[value]]</b>",
		        "fillAlphas": 0.85,
		        "lineAlpha": 0.1,
		        "type": "column",
		        "topRadius":1,
		        "valueField": "SUM"
		    }],
		    "depth3D": 40,
			"angle": 30,
		    "chartCursor": {
		        "categoryBalloonEnabled": false,
		        "cursorAlpha": 0,
		        "zoomable": false
		    },    
		    "categoryField": criteria,
		    "categoryAxis": {
		        "gridPosition": "start",
		        "axisAlpha":0,
		        "gridAlpha":0
		        
		    },
		    "export": {
		    	"enabled": true
		     }

		},0);
		
		
		jQuery('.chart-input').off().on('input change',function() {
			var property	= jQuery(this).data('property');
			var target		= chart;
			chart.startDuration = 0;

			if ( property == 'topRadius') {
				target = chart.graphs[0];
			}

			target[property] = this.value;
			chart.validateNow();
		});
	});
	
}
