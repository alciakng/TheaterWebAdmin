$(function() {

	
	var d = new Date();

	
	$('#yearSelect').datepicker({
		  format: "yy", // Notice the Extra space at the beginning
		  viewMode: "years", 
		  minViewMode: "years",
		  autoclose: true,
	}).on('changeDate', function(e){
		$('#byYear').empty();
		getStatisticByMovie('byYear','year',e.format('yy'));

    });
	
	$('#monthSelect').datepicker({
		  format: "yy-mm", // Notice the Extra space at the beginning
		  viewMode: "months", 
		  minViewMode: "months",
		  autoclose: true
	}).on('changeDate', function(e){
		$('#byMonth').empty();
		getStatisticByMovie('byMonth','month',e.format('yy-mm'));
    });
	
	$('#daySelect').datepicker({
		  format: "yy-mm-dd", // Notice the Extra space at the beginning
		  autoclose: true
	}).on('changeDate', function(e){
		$('#byDay').empty();
		getStatisticByMovie('byDay','day',e.format('yy-mm-dd'));
    });
	
	getStatisticByMovie('byYear','year',d.toISOString().substr(2,2));
	getStatisticByMovie('byMonth','month',d.toISOString().substr(2,5));
	getStatisticByMovie('byDay','day',d.toISOString().substr(2,8));
	
	

		  
});

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getStatisticByMovie(element,criteria,date){

	$.get( "/statistics/byMovie",{ criteria:criteria,date:date}).done(function( data ) {
		/*
		Morris.Bar({
			  element: element,
			  data: data,
			  xkey: 'NAME',
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
		    "categoryField": "NAME",
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


