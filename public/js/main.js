$(function(){
	console.log('test main js');

	$('.btncntrl').click(function(){
		var ops = $(this).data('ops');
		var device = $(this).data('device');
		$.post( "/operate" , {'device': device, 'operation': ops});
		console.log(device);
		console.log(ops);
	});
});