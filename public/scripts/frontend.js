/* global $ localStorage*/

$(document).ready(function(){
    // var bodyTheme = localStorage;
    // var jumboTheme = localStorage;
    var greenThemeBody = "#C9F5C9";
    var blueThemeBody = "#AEE3F5";
    var darkThemeBody = "#B0B2B5";
    
    var greenNavBody = "#5cb85c";
    var blueNavBody = "#0C65C4";
    var darkNavBody = "#454A4F";
    
    $("#theme-btn").on("click", function(){
        if(localStorage.bodyTheme === "#C9F5C9"){
            localStorage.bodyTheme = blueThemeBody;
            localStorage.navTheme = blueNavBody;
        } else if(localStorage.bodyTheme === "#AEE3F5"){
            localStorage.bodyTheme = darkThemeBody;
            localStorage.navTheme = darkNavBody
        } else if(localStorage.bodyTheme === "#B0B2B5"){
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
        
        // if(bodyTheme.getItem("background-color") === "#C9F5C9"){
        //     $("body").css("background-color", "#AEE3F5");
        //     bodyTheme.setItem("background-color", "#AEE3F5");
        // } else {
        //     $("body").css("background-color", "#C9F5C9");
        //     bodyTheme.setItem("background-color", "#C9F5C9");
        // }
        // if(navsTheme.getItem("background-color") === "#C9F5C9"){
        //     $(".jumbotron").css("background-color", "#0C65C4");
        //     navsTheme.setItem("background-color", "#0C65C4");
        // } else {
        //     $(".jumbotron").css("background-color", "#C9F5C9");
        //     navsTheme.setItem("background-color", "#C9F5C9");
        // }
    });
    
    $("body").css("background-color", localStorage.bodyTheme);
    $(".jumbotron").css("background-color", localStorage.navTheme);
    $(".navbar-default").css("background-color", localStorage.navTheme);
    $(".thumbnail").css("background-color", localStorage.navTheme);
    $(".footer").css("background-color", localStorage.navTheme);
    $("#about").css("background-color", localStorage.navTheme);
    $("#contact").css("background-color", localStorage.navTheme);

    // var theme = bodyTheme.getItem("background-color");
    // $("body").css("background-color", theme);
    // var navTheme = navsTheme.getItem("background-color");
    // $(".jumbotron").css("background-color", navTheme);
});