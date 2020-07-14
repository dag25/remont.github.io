$(function() {
    let intro = $('#intro');
    let header = $('#header');
    // получаем высоту блока
    let introH = intro.innerHeight();
    // получаем высоту шапки
    let headerH = header.innerHeight();
    // определяем позицию скролла
    let scrollTop = $(window).scrollTop();


    // **********************
    // header class on scroll
    // **********************


    headerScroll();
    
    // отслеживаем скролл
    $(window).on('scroll resize', function() {
        headerScroll();
    });

    function headerScroll() {
        // обновляется высота блока
        introH = intro.innerHeight();
        // обновляется высота шапки
        headerH = header.innerHeight();

        let scrollTop = $(this).scrollTop();
        
        if (scrollTop >= (introH - headerH)) {
            header.addClass('header--dark');
        } else {
            header.removeClass('header--dark');
        }
    }

    // *************************
    // Smooth scroll to section
    // *************************


    $('[data-scroll]').on('click', function(event) {
        event.preventDefault();

        let scrollEl = $(this).data('scroll');
        let scrollElPos = $(scrollEl).offset().top;

        $('body').removeClass('show-nav');
        navToggle.removeClass('active');
        nav.removeClass('show');

        $('html, body').animate({
            scrollTop: scrollElPos - headerH,
        },500);
    });

    // *************************
    // Scroll Spy
    // *************************

    let windowH = $(window).height();

    scrollSpy(scrollTop);

    $(window).on('scroll', function() {

        scrollTop = $(this).scrollTop();

        scrollSpy(scrollTop);

    });

    function scrollSpy() {
        $("[data-scrollspy]").each(function() {

            let $this = $(this);
            let sectionId = $this.data("scrollspy");
            let sectionOffset = $this.offset().top;
            sectionOffset = sectionOffset - (windowH * 0.33333);

            if (scrollTop >= sectionOffset) {
                $('#nav [data-scroll]').removeClass('active');
                $('#nav [data-scroll="' + sectionId + '"]').addClass('active');
            }

            if (scrollTop == 0) {
                $('#nav [data-scroll]').removeClass('active');
            }
        });
    }

    // *************************
    // Modal
    // *************************

    $('[data-modal').on('click', function(event) {
        event.preventDefault();
        // получаем атрибут кнопки
        let modal = $(this).data('modal');
        // убираем скроллинг на странице
        $('body').addClass('no-scroll');
        // показываем модальное окно
        $(modal).addClass('show');
        // плавное появление окна
        setTimeout(function(){
            $(modal).find('.modal__content').css({
                transform: 'scale(1)',
                opacity: '1',
            });
        }, 200);        
    });

    $('[data-modal-close').on('click', function(event){
        event.preventDefault();
        // находим родителя кнопки
        let modal = $(this).parents('.modal');
        
        modalClose(modal);
    });

    // закрытие по клику за пределами окна
    $('.modal').on('click', function() {
        let modal = $(this);
        
        modalClose(modal);
    });

    $('.modal__content').on('click', function(event) {
        event.stopPropagation();
    });

    function modalClose(modal) {
        // плавное закрытие окна
        modal.find('.modal__content').css({
            transform: 'scale(0.5)',
            opacity: '0',
        });

        setTimeout(function(){
            $('body').removeClass('no-scroll');
            modal.removeClass('show');
        }, 200);       
    }


    // *************************
    // Slick slider
    // *************************

    // первый слайдер
    let intoSlider = $('#introSlider');
    intoSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 2500,
    });

    $('#introSliderPrev').on('click', function() {
        intoSlider.slick('slickPrev');
    });

    $('#introSliderNext').on('click', function() {
        intoSlider.slick('slickNext');
    });


    // второй слайдер
    let reviewsSlider = $('#reviewsSlider');
    reviewsSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 500,
    });

    // *************************
    // Burger
    // *************************

    let navToggle = $('#navToggle');
    let nav = $('#nav');

    navToggle.on('click', function(event) {
        event.preventDefault();

        $('body').toggleClass('show-nav');
        $(this).toggleClass('active');
        nav.toggleClass('show');
    });

    $(window).on('resize', function() {
        $('body').removeClass('show-nav');
        navToggle.removeClass('active');
        nav.removeClass('show');
    });


    // ******************************
        // AOS
    // ******************************

    AOS.init({
			// Global settings:
			disable: 'phone', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
			startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
			initClassName: 'aos-init', // class applied after initialization
			animatedClassName: 'aos-animate', // class applied on animation
			useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
			disableMutationObserver: false, // disables automatic mutations' detections (advanced)
			debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
			throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

			// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
			offset: 120, // offset (in px) from the original trigger point
			delay: 0, // values from 0 to 3000, with step 50ms
			duration: 1300, // values from 0 to 3000, with step 50ms
			easing: 'ease', // default easing for AOS animations
			once: false, // whether animation should happen only once - while scrolling down
			mirror: false, // whether elements should animate out while scrolling past them
			anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
        });
        
    // ******************************
        // кнопка на вверх
    // ******************************

    var //скорость прокрутки к началу страницы
			speed = 500,
			//html-разметка кнопки
			$scrollTop = $(
				'<a href="#" title="Быстро вернуться наверх" class="scrollTop"><i class="fa fa-angle-double-up"></i></a>'
			).appendTo('body');
		$scrollTop.click(function (e) {
			e.preventDefault();
			$('html:not(:animated),body:not(:animated)').animate({ scrollTop: 0 }, speed);
		});
		//настройка режима появления кнопки
		function show_scrollTop() {
			$(window).scrollTop() > 300 ? $scrollTop.fadeIn(600) : $scrollTop.fadeOut(600);
		}
		$(window).scroll(function () {
			show_scrollTop();
		});
        show_scrollTop();
        
        // phone button
        const phoneBtn = $('.dws');
        function show_phoneBtn() {
            $(window).scrollTop() > 300 ? phoneBtn.fadeIn(600) : phoneBtn.fadeOut(600);
        }
        $(window).scroll(function () {
			show_phoneBtn();
		});
        show_phoneBtn();

        // phone button


        // circle

        const circleType = new CircleType(document.getElementById("rotated")).radius(15);
        $(window).scroll(function() {
            var place = $(window).scrollTop();
            place = place * 0.4;

            $(".circular-text").css({
                "-moz-transform" : "rotate(" + place + "deg)",
                "-webkit-transform" : "rotate(" + place + "deg)",
                "-o-transform" : "rotate(" + place + "deg)",
                "-ms-transform" : "rotate(" + place + "deg)",
                "transform" : "rotate(" + place + "deg)"
            });
        });



});

