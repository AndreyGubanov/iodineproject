//Slider
require('glidejs');
require('glidejs/src/sass/glide.core.scss');

//Styles
require('./solutions.scss');



$(document).ready(function() {


    $("#Glide").glide({
        type: "carousel",
        startAt: 1,
        afterInit: function(event) {
            $('#totalSlides').html(event.length);
        },
        afterTransition : function(event) {
            $('#currentSlide').html(event.index);
        }
    });

    $('.ui.sticky').sticky();

    $('.ui.accordion').accordion({
        duration: 300
    });

    //Change header on scroll
    $(window).scroll( function() {
        var top = $(this).scrollTop();

        if (top > 75) {
            $('#pageHeader').addClass('scrolled');
        } else {
            $('#pageHeader').removeClass('scrolled');
        }
    });

    //Smooth scrolling for anchored links

    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            if (this.hash !== "") {

                event.preventDefault();
                var hash = this.hash;
                var height = $('#pageHeader').outerHeight();

                $('html, body').animate({
                    // scrollTop: $(hash).offset().top-height
                    scrollTop: $(hash).offset().top
                }, 800, function(){

                    window.location.hash = hash;
                });
            }
        });

    //Popups

    //Mobile header toggle
    $('#toggleMobileHeader').click(function() {
      $('#mobileHeader').modal('show');

      $('#mobileHeader').find('a').click(function() {
          $('#mobileHeader').modal('hide');
      });
    });
    //

});



