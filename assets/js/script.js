/*
    ========================================
    Preloader
    ========================================
    */

if ($('#preloader').length) {
    $(window).on('load', function() {
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    });
}

/* 
=====================================================
    Start active menu
======================================================
*/

var sections = jQuery('section'),
    nav = jQuery('nav'),
    nav_height = nav.outerHeight();

jQuery(window).on('scroll', function() {
    var cur_pos = jQuery(this).scrollTop();

    sections.each(function() {
        var top = jQuery(this).offset().top - nav_height,
            bottom = top + jQuery(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('a').removeClass('active');
            sections.removeClass('active');

            jQuery(this).addClass('active');
            nav.find('a[href="#' + jQuery(this).attr('id') + '"]').addClass('active');
        }
    });
});


/* 
=====================================================
    Responsive Menu
======================================================
*/
// Responsive Menu
$(document).ready(function() {
    // jQuery code
    $("[data-trigger]").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        var offcanvas_id = $(this).attr('data-trigger');
        $(offcanvas_id).toggleClass("show");
        $('body').toggleClass("offcanvas-active");
        $(".screen-overlay").toggleClass("show");
    });

    $(".btn-close, .screen-overlay").click(function(e) {
        $(".screen-overlay").removeClass("show");
        $(".mobile-offcanvas").removeClass("show");
        $("body").removeClass("offcanvas-active");
    });

}); // jquery end


/* ===============================================
        fixed menu js
    ===============================================
*/

$(window).on('scroll', function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 200) {
        $("#mainNav").addClass("shrinkheader");
    } else {
        $("#mainNav").removeClass("shrinkheader");
    }
});

/* 
========================================
    Wow Animation
========================================
*/

new WOW().init();


/* 
========================================
    client-logo
========================================
*/

$('.client-logo-wrapper').owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    autoplaySpeed: 3000,
    autoplayTimeout: 2000,
    responsive: {
        0: {
            items: 2
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
})


/*
========================================
Select Js
========================================
*/

$('select').each(function() {
    var $this = $(this),
        numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function() {
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        //console.log($this.val());
    });

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});