$(document).ready(function(){
	$.ajax({
		"url": "_view/json",
		"dataType": "json",
		"success": (data) {
			$.each(data.rows, function(index, value){
				console.log(value);
			});
		}
	});
});