const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const signup_form = document.getElementById("signup_form");
const login_form = $("#login_form");
const container = document.querySelector(".container");
let jwt_storage = null
signInBtn.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
    });
signUpBtn.addEventListener("click", () => {
    container.classList.add("right-panel-active");
    });

login_form.on("submit", function(e){
    e.preventDefault()
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    var url = 'http://127.0.0.1:8000/api/login/'
    var email = $("#login_email").val()
    var password = $("#login_password").val()
    var data = {
            username: email,
            password: password,
            csrfmiddlewaretoken: csrftoken
        }
    $.ajax({
        type: 'POST',
        url: url,
        dataType:'json',
        data: data,
        async: true,
        success: function(val){
            console.log(val)
             /*window.location.replace('http://127.0.0.1:8000/posts/')*/

        },
        error: function(err){
            console.log(err)
            console.log('An error has occured')
        },
        complete: function(){
            console.log('Complete')
        }
    })
});
