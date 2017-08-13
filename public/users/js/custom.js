$(document).ready(function() {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;

    trigger.click(function() {
        hamburger_cross();
    });

    function hamburger_cross() {

        if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    $('[data-toggle="offcanvas"]').click(function() {
        $('body').toggleClass('toggled');
    });

    $('.navbar-header').click(function() {
        $('.navbar-collapse.collapse').toggleClass('in');
    });

    $('.slider1').owlCarousel({
        loop: false,
        margin: 20,
        responsiveClass: true,
        nav: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 5,
            }
        }
    });

    (function($) {
        $('.spinner .btn:first-of-type').on('click', function() {
            $('.spinner input').val(parseInt($('.spinner input').val(), 10) - 1);
        });
        $('.spinner .btn:last-of-type').on('click', function() {
            $('.spinner input').val(parseInt($('.spinner input').val(), 10) + 1);
        });
    })(jQuery);


    if (window.matchMedia("(max-width: 767px)").matches) {
        $('.header .seach input[type="submit"]').hover(function() {
            $('.header .seach input[type="text"]').toggleClass('in');
        })
    };

    $('.button').click(function() {
        $('.setup').toggleClass('bg-in').siblings().removeClass('bg-in');
        $(this).toggleClass('bg').siblings().removeClass('bg');
    });
    $('.backgroud .btn-1').click(function() {
        $('.content-center').css({
            background: '#d8d8d8',
            color: '#4a4a4a;'
        });;
    });
    $('.backgroud .btn-2').click(function() {
        $('.content-center').css({
            background: '#ceb78e',
            color: '#4a4a4a;'
        });;
    });
    $('.backgroud .btn-3').click(function() {
        $('.content-center').css({
            background: '#4a4a4a',
            color: '#fff'
        });;
    });
    $('.backgroud .btn-4').click(function() {
        $('.content-center').css({
            background: '#0d0d0d',
            color: '#fff'
        });;
    });
    //Font size
     var fontz = $('.font-size .input').val();
    function getSize() {
        size = $(".content-center p").css("font-size");
        size = parseInt(size, 10);
        $("#font-size").text(size);
    }

    //get inital font size
    getSize();

    $(".btn-up").on("click", function() {

        // parse font size, if less than 50 increase font size
        if ((size + 1) <= 50) {
            $(".content-center p").css("font-size", "+=1");
            $("#font-size").text(size += 1);
        }
    });

    $(".btn-down").on("click", function() {
        if ((size - 1) >= 12) {
            $(".content-center p").css("font-size", "-=1");
            $("#font-size").text(size -= 1);
        }
    });
});