

function main(){
	ajaxCall();
  	repeat = setInterval(ajaxCall,30000);

  }
$(document).ready(main);

$(function() {

          $.scrollify({
            section : ".section",
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


  	/*var http = new XMLHttpRequest();
  	http.open('GET',url);
  	http.onload = function(){
  		alert(http.responseText);
  	}
  	http.send();*/
  }

/**
 * Prevention Section
 */

const one = document.querySelector('.one');
const two = document.querySelector('.two');
const three = document.querySelector('.three');
const four = document.querySelector('.four');

/**
 * Section One
 */
one.addEventListener("mouseenter", () => {
	one.classList.add("maximize");
	two.classList.add("minimize");
	three.classList.add("minimize");
	four.classList.add("minimize");
});

one.addEventListener("mouseleave", () => {
	one.classList.remove("maximize");
	two.classList.remove("minimize");
	three.classList.remove("minimize");
	four.classList.remove("minimize");
});

/**
 * Section Two
 */
two.addEventListener("mouseenter", () => {
	two.classList.add("maximize");
	one.classList.add("minimize");
	three.classList.add("minimize");
	four.classList.add("minimize");
});

two.addEventListener("mouseleave", () => {
	two.classList.remove("maximize");
	one.classList.remove("minimize");
	three.classList.remove("minimize");
	four.classList.remove("minimize");
});

/**
 * Section Three
 */
three.addEventListener("mouseenter", () => {
	three.classList.add("maximize");
	one.classList.add("minimize");
	two.classList.add("minimize");
	four.classList.add("minimize");
});

three.addEventListener("mouseleave", () => {
	three.classList.remove("maximize");
	one.classList.remove("minimize");
	two.classList.remove("minimize");
	four.classList.remove("minimize");
});
 /**
 * Section Four
 */

four.addEventListener("mouseenter", () => {
	four.classList.add("maximize");
	one.classList.add("minimize");
	two.classList.add("minimize");
	three.classList.add("minimize");
});

four.addEventListener("mouseleave", () => {
	four.classList.remove("maximize");
	one.classList.remove("minimize");
	two.classList.remove("minimize");
	three.classList.remove("minimize");
});