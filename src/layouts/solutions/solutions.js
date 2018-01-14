//Common JS
require('../common.js');

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


});



