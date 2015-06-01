$(function() {

	var d = new Date();
	
	$('#yearSelect').datepicker({
		  format: "yy", // Notice the Extra space at the beginning
		  viewMode: "years", 
		  minViewMode: "years",
		  autoclose: true,
		  barColors: function (row, series, type) {
			  if(row.label == "슈퍼사운드관") return "#AD1D28";
			  else if(row.label == "슈퍼4D관") return "#DEBB27";
			  else if(row.label == "슈퍼플렉스관") return "#fec04c";
			  else if(row.label == "바이브레이션관") return "#1AB244";
			  }
	}).on('changeDate', function(e){
		$('#byYear').empty();
		getStatisticByScreen('byYear','year',e.format('yy'));

  });
	
	$('#monthSelect').datepicker({
		  format: "yy-mm", // Notice the Extra space at the beginning
		  viewMode: "months", 
		  minViewMode: "months",
		  autoclose: true,
		  barColors: function (row, series, type) {
			    if (type === 'bar') {
			      var red = Math.ceil(255 * row.y / this.ymax);
			      return 'rgb(' + red + ',0,0)';
			    }
			    else {
			      return '#000';
			    }
			  }
	}).on('changeDate', function(e){
		$('#byMonth').empty();
		getStatisticByScreen('byMonth','month',e.format('yy-mm'));
  });
	
	$('#daySelect').datepicker({
		  format: "yy-mm-dd", // Notice the Extra space at the beginning
		  autoclose: true,
		  barColors: function (row, series, type) {
			    if (type === 'bar') {
			      var red = Math.ceil(255 * row.y / this.ymax);
			      return 'rgb(' + red + ',0,0)';
			    }
			    else {
			      return '#000';
			    }
			  }
	}).on('changeDate', function(e){
		$('#byDay').empty();
		getStatisticByScreen('byDay','day',e.format('yy-mm-dd'));
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

