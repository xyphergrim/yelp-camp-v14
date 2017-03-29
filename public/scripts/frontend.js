/* global $ localStorage*/

$(document).ready(function(){
    // Theme colors
    var greenThemeBody = "#C9F5C9";
    var blueThemeBody = "#AEE3F5";
    var darkThemeBody = "#B0B2B5";
    var greenNavBody = "#5cb85c";
    var blueNavBody = "#0C65C4";
    var darkNavBody = "#454A4F";

    // If there are no localStorage objects yet, create them and assign them to css
    if(!localStorage.bodyTheme && !localStorage.navTheme){
        localStorage.bodyTheme = greenThemeBody;
        localStorage.navTheme = greenNavBody;
        
        $("body").css("background-color", localStorage.bodyTheme);
        $(".jumbotron").css("background-color", localStorage.navTheme);
        $(".navbar-default").css("background-color", localStorage.navTheme);
        $(".thumbnail").css("background-color", localStorage.navTheme);
        $(".footer").css("background-color", localStorage.navTheme);
        $("#about").css("background-color", localStorage.navTheme);
        $("#contact").css("background-color", localStorage.navTheme);
    }
    
    // Load the localStorage objects into the css elements
    if(localStorage.bodyTheme && localStorage.navTheme){
        $("body").css("background-color", localStorage.bodyTheme);
        $(".jumbotron").css("background-color", localStorage.navTheme);
        $(".navbar-default").css("background-color", localStorage.navTheme);
        $(".thumbnail").css("background-color", localStorage.navTheme);
        $(".footer").css("background-color", localStorage.navTheme);
        $("#about").css("background-color", localStorage.navTheme);
        $("#contact").css("background-color", localStorage.navTheme);
    }
    
    $("#theme-btn").on("click", function(){
        if(localStorage.bodyTheme === greenThemeBody){
            localStorage.bodyTheme = blueThemeBody;
            localStorage.navTheme = blueNavBody;
        } else if(localStorage.bodyTheme === blueThemeBody){
            localStorage.bodyTheme = darkThemeBody;
            localStorage.navTheme = darkNavBody;
        } else {
            localStorage.bodyTheme = greenThemeBody;
            localStorage.navTheme = greenNavBody;
        }
        
        $("body").css("background-color", localStorage.bodyTheme);
        $(".jumbotron").css("background-color", localStorage.navTheme);
        $(".navbar-default").css("background-color", localStorage.navTheme);
        $(".thumbnail").css("background-color", localStorage.navTheme);
        $(".footer").css("background-color", localStorage.navTheme);
        $("#about").css("background-color", localStorage.navTheme);
        $("#contact").css("background-color", localStorage.navTheme);
    });
});