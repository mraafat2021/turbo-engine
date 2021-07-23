$(document).ready(function() {
    validation();
    reset();
    changebtns();


    setInterval(function() {
        var bill = parseFloat($("#billNum").val());
        var percentage = $(".active").attr("value") || parseFloat($("#customNum").val());
        var people = parseInt($("#peopleNum").val());
        var tip = ((bill * percentage) / people);

        if (bill > 0 && Number.isInteger(people) && people > 0 && percentage > 0 && percentage < 1) {
            $("#amount").text(tip.toFixed(2));
            $("#total").text(((bill / people) + tip).toFixed(2));
        }

    }, 100)
})

function validation() {
    $("#billNum").change(function() {
        if (!$(this).val() || $(this).val() <= 0) {
            $("#billError").text("Can't be zero")
                .css("color", "red");
        } else {
            $("#billError").text("");
        }
    })

    $("#peopleNum").change(function() {
        if (!$(this).val() || $(this).val() <= 0) {
            $("#peopleError").text("Can't be zero")
                .css("color", "red");
        } else {
            $("#peopleError").text("");
        }
    })

    $("#customNum").change(function() {
        if ($(this).val() > 1) {
            $(this).css("border", "1px solid red")
        } else {
            $(this).css("border", "none")
        }
    })
}

function changebtns() {
    $(":button").click(function() {
        $(this).addClass("active");
        $(":button").not(this).removeClass("active");
        $("#customNum").val("");
    });
    $("#customNum").focus(function() {
        $(":button").removeClass("active");
    });
}

function reset() {
    $(":reset").click(function() {
        $("input").val("");
        $(":button").removeClass("active");
        $("#peopleError").text("");
        $("#billError").text("");
        $("#amount").text("0.00");
        $("#total").text("0.00");
        $("#customNum").css("border", "none")
    })
}