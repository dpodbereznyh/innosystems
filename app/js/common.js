$(document).ready(function () {

    $(window).scroll(function() {
        if ($(this).scrollTop() > 90){
            $('header').addClass("sticky");
        }
        else{
            $('header').removeClass("sticky");
        }
    });

// SmartMenus mobile menu toggle button
    $(function() {
        var $mainMenuState = $('#main-menu-state');
        if ($mainMenuState.length) {
            // animate mobile menu
            $mainMenuState.change(function(e) {
                var $menu = $('#main-menu');
                if (this.checked) {
                    $menu.hide().slideDown(250, function() { $menu.css('display', ''); });
                } else {
                    $menu.show().slideUp(250, function() { $menu.css('display', ''); });
                }
            });
            // hide mobile menu beforeunload
            $(window).bind('beforeunload unload', function() {
                if ($mainMenuState[0].checked) {
                    $mainMenuState[0].click();
                }
            });
        }
    });

    //Close menu
    $(window).ready(closeMenu);
    $(window).resize(closeMenu);
    function closeMenu()
    {
        if ( $(window).width() < 1100 ) {
            $(".yakor").on("click", function (event) {
                setTimeout(function(){
                    $("#main-menu-state").prop('checked', false).change();
                }, 300);
            });
        }
    }

    // для плавного перехода по якорям
    $(".yakor").on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top -160;
        $('body,html').animate({scrollTop: top}, 500);
    });

    $(".js-callback").on( "click", function() {
        var newtitle = $(this).attr("data-title");
        var newinput = $(this).attr("data-input");
        $(".js-title").html(newtitle);
        $(".js-zakaz").val(newinput);
    });


    $("#popup-form").submit(function(){
        $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize()
        }).done(function() {
            // $(this).find("input").val("");
            parent.jQuery.fancybox.getInstance().close();
            $.fancybox.open({
                src: '#fancyalert',
            });
            $("#popup-form").trigger("reset");
        });
        return false;
    });
    $(".footer__form").submit(function(){
        $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize()
        }).done(function() {
            $.fancybox.open({
                src: '#fancyalert',
            });
            $(".footer__form").trigger("reset");
        });
        return false;
    });


});
// Customers Swiper Slider
var customersSlider = new Swiper ('.customers__swiper-container', {
    slideClass: 'customers__swiper-slide',
    wrapperClass: 'customers__swiper-wrapper',
    slidesPerView: 1,
    autoHeight: true,
    pagination: {
        el: '.customers__swiper-pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: 'customers__swiper_bullet',
        bulletActiveClass: 'customers__swiper_bullet-active'
    },
    navigation: {
        nextEl: '.customers__slider_button-next',
        prevEl: '.customers__slider_button-prev',
    }
});

//Certificates
var certificatesSlider = new Swiper ('.certificates__swiper-container', {
    slideClass: 'certificates__swiper-slide',
    wrapperClass: 'certificates__swiper-wrapper',
    slidesPerView: 2,
    spaceBetween: 16,
    navigation: {
        nextEl: '.certificates__slider_button-next',
        prevEl: '.certificates__slider_button-prev',
    }
});

new WOW().init();

var ymID = 66898711;

$(function() {
    $('.js-callback').on("click", function() {
        var sendPopup = $(this).attr('data-send');
        // $(modal).find('input[name=target]').val(parent);
        $(".popup-form__btn").attr("data-goal", sendPopup);
        console.log(sendPopup);
    });

});

var metrikaGoals = function () {


    $('.js-onClickGoal').click(function () {

        var goal = this.dataset.goal;
        // var gtagGoal = this.dataset.gtagGoal;
        // var thisGoal = getCookie(goal);
        if (typeof thisGoal == "undefined") {
            if ((typeof goal !== 'undefined' || goal != '') && typeof ym !== 'undefined') {
                ym(ymID, 'reachGoal', goal);
            }

            var date = new Date(new Date().getTime() + 720 * 3600 * 1000);
            document.cookie = goal + "=1; path=/; expires=" + date.toUTCString();
        }


    });

    $('.js-validate-form').click(function () {
        var form = $(this).closest('.js-form-default');
        var validated = 1;

        $(form).find('input[required]').each(function (indexInArray, valueOfElement) {
            if ($(valueOfElement).val() == "") {
                validated = 0;
            }
        });

        if (validated == 0) {


            var goal = this.dataset.goal;
            // var gtagGoal = this.dataset.gtagGoal;

            if ((typeof goal !== 'undefined' || goal != '') && typeof ym !== 'undefined') {
                ym(ymID, 'reachGoal', goal);
            }
        }
        console.log(form);
    });
};

$(document).ready(function () {
    metrikaGoals();
});

