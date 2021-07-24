$(document).ready(function() {
    var x = 0;
    var y = 0;
    $(".ham").click(function() {
        if (x == 0) {
            $("#list").css("display", "flex");
            $("h1").css("display", "none");
            x = 1;
        } else {
            $("#list").css("display", "none");
            $("h1").css("display", "block");
            x = 0
        }
    })

    //console.log($(".footer").offset());

    $(".arrow").click(function() {
        if (y == 0) {
            window.scrollTo(0, 3685);
            $(this).css("transform", "rotate(180deg)");
            y = 1;
        } else {
            window.scrollTo(0, 0);
            $(this).css("transform", "rotate(360deg)");
            y = 0;
        }
    })
})