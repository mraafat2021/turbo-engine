$(document).ready(function() {
    var s = 60,
        m = 59,
        h = 23,
        d = 12;
    $(".seconds").text(s);
    $(".mins").text(m);
    $(".hours").text(h);
    $(".days").text(d);
    setInterval(function() {
        $(".seconds").text(s);
        $(".mins").text(m);
        $(".hours").text(h);
        $(".days").text(d);
        s = s - 1;
        if (s == 0) {
            m = m - 1;
            s = 60
        }
        if (m == 0) {
            h = h - 1;
            m = 59;
        }
        if (h == 0) {
            d = d - 1;
            h = 23;
        }
    }, 1000)
})