/* global $ Cookies*/

$(document).ready(function(){
    $("#theme-btn").on("click", function(){
         var blueTheme = $("body").css("background-color", "blue");
        Cookies.set("theme", blueTheme);
        // $("body").css("background-color", "blue");
    });
    
    Cookies.get("theme");
});
