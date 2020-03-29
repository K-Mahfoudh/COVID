url = 'http://127.0.0.1:8000/update/'
total_dz = $('#total-dz');
total_world = $('#total-world') ;
active_dz = $('#active-dz');
active_world = $('#active-world');
recovered_dz = $('#recover-dz');
recovered_world = $('#recover-world');
death_dz = $('#death-dz');
death_world = $('#death-world');
$(function() {
          $.scrollify({
            section : ".section",
          });
        });
  	
function main(){
	
  	ajaxCall();
  }
$(document).ready(main);


function ajaxCall(){

  	$.ajax({
  		method: 'GET',
  		url: url,
  		success: function(data){
  			total_dz.slideDown().text(data['column_1']) 
  			total_world.text(data["Coronavirus Cases"]);
  			active_dz.text(data['column_6']) ;
  			active_world.text(data['World Active']) ;
  			recovered_dz.text(data['column_5']) ;
  			recovered_world.text(data['Recovered']) ;
  			death_dz.text(data['column_3']) ;
  			death_world.text(data['Deaths']) ;
  		},
  		error: function(error_data){
  			alert('error')
  		}
  	})

  	/*var http = new XMLHttpRequest();
  	http.open('GET',url);
  	http.onload = function(){
  		alert(http.responseText);
  	}
  	http.send();*/
  }
