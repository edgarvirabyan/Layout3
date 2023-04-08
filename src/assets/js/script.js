// script for slickslider plugin 
$(document).ready(function () {
    $('.carousel__inner').slick({
        adaptiveHeight: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<button type="button" class="slick-prev"><img src="assets/images/svg/chevronLeft.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="assets/images/svg/chevronRight.svg"></button>',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    autoplay: false,
                    dots: false,
                    autoplaySpeed: 0,
                    prevArrow: '<button class="prev_arrow"><img src="assets/images/svg/chevronLeft.svg" alt="Previous"></button>',
                    nextArrow: '<button class="next_arrow"><img src="assets/images/svg/chevronRight.svg" alt="Next"></button>',

                }
            }
        ],
    });

    // script for toggling slides when clicking on "ПОДРОБНЕЕ", "НАЗАД" buttons
    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog__card-content').eq(i).toggleClass('catalog__card-content_active');
                $('.catalog__card-list').eq(i).toggleClass('catalog__card-list_active');
            })
        });
    };

    toggleSlide('.catalog__card-btn');
    toggleSlide('.catalog__card-btn_back');

    // script for linking buttons to modal windows and make them work with each other (+ close button(modal__close))
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.pulsometer-buy-btn').each(function (i) {
        $(this).on('click', function () {
            $('#order .consultation__descr').text($('.catalog__card-title').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });



    //script for pageup <a> tag to make it appear after scrolling 700 pixels
    $(window).scroll(function () {
        if ($(this).scrollTop() > 700) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    //script for <a> tags to make the scroll smoothly
    $('a').click(function () {
        const target = $(this).attr("href");
        const $targetElem = $(target);
        if ($targetElem.length) {
            const targetOffset = $targetElem.offset().top;
            $('html, body').animate({ scrollTop: targetOffset }, 1000);
            return false;
        }
    });



    //script for validate forms plugin 
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    };
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');


    // this is for maskedInput plugin for inputs
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // script for PHP mailer
    $('form').submit(function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

});

//script for mixitup plugin for tabs
const mixer = mixitup('.catalog__inner', {
    animation: {
        effects: 'fade translateX(100%)',
        reverseOut: true,
        nudge: false
    }
});
if (window.matchMedia('(max-width: 767px)').matches) {
    mixer.configure({
        animation: {
            enable: false
        }
    });
}
mixer.toggleOn('.polarft1, .suuntom2, .polarft4')
    .then(function (state) {
    });


//  When we scroll down to review_item and when it appears in our viewport, the animate__fadeInUp class gonna append to classes and the animation will start
const reviewItems = document.querySelectorAll('.review__item');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__fadeInUp');
            observer.unobserve(entry.target);
        }
    });
});

reviewItems.forEach(item => {
    observer.observe(item);
});



//removing hvr-float-shadow class on viewport smaller than 767px
function removeFloatShadow() {
    const elements = document.querySelectorAll('.hvr-float-shadow');
    elements.forEach(element => {
        element.classList.remove('hvr-float-shadow');
    });
}
function handleResize() {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth < 767) {
        removeFloatShadow();
    }
}
window.addEventListener('resize', handleResize);
handleResize();









