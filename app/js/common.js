$(document).ready(function () {

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
            top = $(id).offset().top -1;
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
    $(".main-form__form").submit(function(){
        $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize()
        }).done(function() {
            $.fancybox.open({
                src: '#fancyalert',
            });
            $(".main-form__form").trigger("reset");
        });
        return false;
    });
});