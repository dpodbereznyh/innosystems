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

    //Метрика
    var ymID = 68534584;

    $(function() {
        $('.js-callback').on("click", function() {
            var sendPopup = $(this).attr('data-send');
            // $(modal).find('input[name=target]').val(parent);
            $(".popup-form__btn").attr("data-goal", sendPopup);
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
        });
    };

    $(document).ready(function () {
        metrikaGoals();
    });
    debugger;
});

    

