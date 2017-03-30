/* global $ localStorage*/

$(document).ready(function(){
    //Theme colors
    // var greenThemeBody = "#C9F5C9";
    // var blueThemeBody = "#AEE3F5";
    // var darkThemeBody = "#B0B2B5";
    // var greenNavBody = "#5cb85c";
    // var blueNavBody = "#0C65C4";
    // var darkNavBody = "#454A4F";
    // var btnBlueTheme = "#5cb85c";
    // var btnDefault = "#337ab7";
    
    // // Check if browser supports Web Storage
    // if (typeof(Storage) !== "undefined") {
    //     // If there are no localStorage objects yet, create them and assign them to css
    //     if(!localStorage.bodyTheme && !localStorage.navTheme){
    //         localStorage.bodyTheme = greenThemeBody;
    //         localStorage.navTheme = greenNavBody;
    //         localStorage.btnTheme = btnDefault;
    //     } else {
    //         // Load the localStorage objects into the css elements
    //         setAppTheme();
    //     }

    //     $("#theme-btn").on("click", function(){
    //         if(localStorage.bodyTheme === greenThemeBody){
    //             localStorage.bodyTheme = blueThemeBody;
    //             localStorage.navTheme = blueNavBody;
    //             localStorage.btnTheme = btnBlueTheme;
    //         } else if(localStorage.bodyTheme === blueThemeBody){
    //             localStorage.bodyTheme = darkThemeBody;
    //             localStorage.navTheme = darkNavBody;
    //             localStorage.btnTheme = btnDefault;
    //         } else {
    //             localStorage.bodyTheme = greenThemeBody;
    //             localStorage.navTheme = greenNavBody;
    //         }
            
    //         setAppTheme();
    //     });
    // } else {
    //     // Sorry! No Web Storage support..
    //     alert("Your browser does not support Web Storage. Some features may be disabled. " + 
    //     "Please update your browser for full YelpCamp compatibility.");
    // }

    // function setAppTheme(){
    //     $("body").css("background-color", localStorage.bodyTheme);
    //     $(".jumbotron").css("background-color", localStorage.navTheme);
    //     $(".navbar-default").css("background-color", localStorage.navTheme);
    //     $(".thumbnail").css("background-color", localStorage.navTheme);
    //     $(".footer").css("background-color", localStorage.navTheme);
    //     $(".btn-primary").css("background-color", localStorage.btnTheme);
    //     $("#about").css("background-color", localStorage.navTheme);
    //     $("#contact").css("background-color", localStorage.navTheme);
    // }
    
    
    
    //=======================================================================================================
    // DIFFERENT WAY BY LOADING IN DIFFERENT CSS FILES - both ways have lag issue when navigating through app
    //=======================================================================================================
    if(typeof(Storage) !== "undefined"){
        if(!localStorage.currentNewTheme){
            var defaultTheme = "green";
            localStorage.currentNewTheme = defaultTheme;
        }
        
        // When the page loads, look for the cookie value.
        var theme = localStorage.currentNewTheme;   
        
        // If you find it
        if (theme === "green") {
            $("#green-theme").attr("rel", "stylesheet");
            $("#blue-theme").attr("rel", "alt-stylesheet");
            $("#dark-theme").attr("rel", "alt-stylesheet");
            // $('link[id="green-theme"]').attr('href', '/stylesheets/main.css');
        } else if (theme === "blue") {
            $("#blue-theme").attr("rel", "stylesheet");
            $("#green-theme").attr("rel", "alt-stylesheet");
            $("#dark-theme").attr("rel", "alt-stylesheet");
            // $('link[id="theme"]').attr('href', '/stylesheets/mainBlue.css');
        } else if (theme === "dark") {
            $("#dark-theme").attr("rel", "stylesheet");
            $("#main-theme").attr("rel", "alt-stylesheet");
            $("#blue-theme").attr("rel", "alt-stylesheet");
            // $('link[id="theme"]').attr('href', '/stylesheets/mainDark.css');
        }
    
        $("#theme-btn").on("click", function(){
            if (theme === "green") {
                $("#blue-theme").attr("rel", "stylesheet");
                $("#green-theme").attr("rel", "alt-stylesheet");
                $("#dark-theme").attr("rel", "alt-stylesheet");
                // $('link[id="theme"]').attr('href', '/stylesheets/mainBlue.css');
                localStorage.currentNewTheme = "blue";
            } else if (theme === "blue") {
                $("#dark-theme").attr("rel", "stylesheet");
                $("#main-theme").attr("rel", "alt-stylesheet");
                $("#blue-theme").attr("rel", "alt-stylesheet");
                // $('link[id="theme"]').attr('href', '/stylesheets/mainDark.css');
                localStorage.currentNewTheme = "dark"
            } else if (theme === "dark") {
                $("#green-theme").attr("rel", "stylesheet");
                $("#blue-theme").attr("rel", "alt-stylesheet");
                $("#dark-theme").attr("rel", "alt-stylesheet");
                // $('link[id="theme"]').attr('href', '/stylesheets/main.css');
                localStorage.currentNewTheme = "green";
            }
        });
    } else {
        // Sorry! no web storage support
        alert("Your browser does not support Web Storage. Some features may be disabled. " + 
        "Please update your browser for full YelpCamp compatibility");
    }
});