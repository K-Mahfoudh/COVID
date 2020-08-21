function main(){
	let jwt = null
	console.log(jwt)
	ajaxCall();
  	repeat = setInterval(ajaxCall,30000);

  }
$(document).ready(main);

$(function() {

          $.scrollify({
            section : ".section",
			 setHeights: true,
			  touchScroll:true,
          });
        });

function ajaxCall(){
	
	url = 'http://127.0.0.1:8000/update/'
	total_dz = $('#total-dz');
	total_world = $('#total-world') ;
	active_dz = $('#active-dz');
	active_world = $('#active-world');
	recovered_dz = $('#recover-dz');
	recovered_world = $('#recover-world');
	death_dz = $('#death-dz');
	death_world = $('#death-world');

	
  	$.ajax({
  		method: 'GET',
  		url: url,
  		success: function(data){
  		
  			total_dz.text(data['column_1']).hide().fadeIn(1000); 
  			total_world.text(data["Coronavirus Cases"]).hide().fadeIn(1000);
  			active_dz.text(data['column_6']).hide().fadeIn(1000);
  			active_world.text(data['World Active']).hide().fadeIn(1000);
  			recovered_dz.text(data['column_5']).hide().fadeIn(1000);
  			recovered_world.text(data['Recovered']).hide().fadeIn(1000);
  			death_dz.text(data['column_3']).hide().fadeIn(1000);
  			death_world.text(data['Deaths']).hide().fadeIn(1000);
  		
  		},
  		error: function(error_data){
  			console.log(error_data)
  		}
  	})

  }

/**
 * Prevention Section
 */
split_element = $('.split');
split_element.mouseenter(function(){
		$(this).addClass('col-md-6').removeClass('col-md-3');
		$(this).siblings().addClass('col-md-2').removeClass('col-md-3');
});

split_element.mouseleave(function(){
	$(this).addClass('col-md-3').removeClass('col-md-6');
	$(this).siblings().addClass('col-md-3').removeClass('col-md-2');
});

function create_user(){
                alert('Hello world')
                $.ajax({
                    type: 'POST',
                    url: 'http://127.0.0.1:8000/dj-rest-auth/registration/',
                    dataType: 'json',
                    data: {
                        "username": $('#username').val(),
                        "email": $('#email').val(),
                        "password1": $('#password1').val(),
                        "password2": $('#password2').val()
                    },
                    success: function(data){
                        console.log(data)
                        console.log('data successfuly sent')
                    },
                    error: function(err){
                        console.log(err)
                    }
                })
}


