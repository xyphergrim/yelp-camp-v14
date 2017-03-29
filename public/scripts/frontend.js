/* global $ localStorage*/

$(document).ready(function(){
    // Theme colors
    var greenThemeBody = "#C9F5C9";
    var blueThemeBody = "#AEE3F5";
    var darkThemeBody = "#B0B2B5";
    var greenNavBody = "#5cb85c";
    var blueNavBody = "#0C65C4";
    var darkNavBody = "#454A4F";
    var btnBlueTheme = "#5cb85c";
    var btnDefault = "#337ab7";
    
    // Check if browser supports Web Storage
    if (typeof(Storage) !== "undefined") {
        // If there are no localStorage objects yet, create them and assign them to css
        if(!localStorage.bodyTheme && !localStorage.navTheme){
            localStorage.bodyTheme = greenThemeBody;
            localStorage.navTheme = greenNavBody;
            localStorage.btnTheme = btnDefault;
            
            setAppTheme();
        } else {
            // Load the localStorage objects into the css elements
            setAppTheme();
        }
        
        $("#theme-btn").on("click", function(){
            if(localStorage.bodyTheme === greenThemeBody){
                localStorage.bodyTheme = blueThemeBody;
                localStorage.navTheme = blueNavBody;
                localStorage.btnTheme = btnBlueTheme;
            } else if(localStorage.bodyTheme === blueThemeBody){
                localStorage.bodyTheme = darkThemeBody;
                localStorage.navTheme = darkNavBody;
                localStorage.btnTheme = btnDefault;
            } else {
                localStorage.bodyTheme = greenThemeBody;
                localStorage.navTheme = greenNavBody;
            }
            
            setAppTheme();
        });
    } else {
        // Sorry! No Web Storage support..
        alert("Your browser does not support Web Storage. Some features may be disabled. " + 
        "Please update your browser for full YelpCamp compatibility.");
    }
    
    function setAppTheme(){
        $("body").css("background-color", localStorage.bodyTheme);
        $(".jumbotron").css("background-color", localStorage.navTheme);
        $(".navbar-default").css("background-color", localStorage.navTheme);
        $(".thumbnail").css("background-color", localStorage.navTheme);
        $(".footer").css("background-color", localStorage.navTheme);
        $(".btn-primary").css("background-color", localStorage.btnTheme);
        $("#about").css("background-color", localStorage.navTheme);
        $("#contact").css("background-color", localStorage.navTheme);
    }
});