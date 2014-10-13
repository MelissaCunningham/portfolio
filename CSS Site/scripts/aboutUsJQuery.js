
$(document).ready(function(){
   dynamicAboutUs();
});

function dynamicAboutUs(){
	$('dd').hide();
	$('dt').bind('click', function(){
	   $(this).toggleClass('open').next().slideToggle();
	});
}

