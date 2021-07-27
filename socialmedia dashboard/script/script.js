$(document).ready(function() {
    $("#theme").text("Dark Mode");
    $("#check").click(function() {
        if ($(this).prop("checked") == true) {
            $("body").addClass("bright");
            $("#theme").text("Bright Mode");
        } else {
            $("body").removeClass("bright");
            $("#theme").text("Dark Mode");
        }
    })
})