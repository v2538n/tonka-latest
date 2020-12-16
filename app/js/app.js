(function($){
	$(document).ready(function(){ 
		

/* ------------ user login form ------------ */

		$('.user').click(function(e){
			e.preventDefault();
			$(this).toggleClass('active');
			$('.login').toggleClass('active');
			$('body').toggleClass('lock');
		});


		$('.login-close').click(function(){
			$('.user').toggleClass('active');
			$('.login').toggleClass('active');
			$('body').toggleClass('lock');
		});

		
		inputValue($('#loginForm')); // placeholder.js



		const userLoginForm = document.getElementById('loginForm');

		userLoginForm.addEventListener('submit', formSend);

		async function formSend(e) {

			e.preventDefault(); 

			let error = formValidate(userLoginForm);

			let formData = new FormData(userLoginForm); 

			if(error === 0){
				 $(userLoginForm).addClass('_sending'); 
				
				 setTimeout(() => {
		 			userLoginForm.reset();
		 			$(userLoginForm).removeClass('_sending'); 
		 			alert('Форма успешно отправлена!');
				 }, 2000);

				/*let response = await fetch('sendmail.php', {
					method: 'POST',
					body: formData
				});

				if(response.ok) {
					let result = await response.json();
					alert(result.message);
					userLoginForm.reset();
					 userLoginForm.classList.remove('_sending'); //userLoginForm.removeClass('_sending'); 
				} else {
					alert('Send error');
					userLoginForm.classList.remove('_sending'); //userLoginForm.removeClass('_sending');
				}*/

			} else {
				alert('Необходимо корректно заполнить все обязательные поля формы!');
			}
		}

		function formValidate(userLoginForm){
			let error   = 0;

			let formReq = $(userLoginForm).find('._req');

			for (let index = 0; index < formReq.length; index++){
				const input = formReq[index];

				formRemoveError(input);
			
				if($(input).hasClass('_email')){ 
					if(emailValidate(input)){
						formAddError(input);
						error++;
					}
				} else if($(input).hasClass('_password')){ 
					if(passwordValidate(input)){
						formAddError(input);
						error++;
					}
				}
			}

			return error;
		}

		function formAddError(input){
			$(input).addClass('_error');
		}

		function formRemoveError(input){
			$(input).removeClass('_error');
		}

		function emailValidate(input) {
			return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
		}

		function passwordValidate(input) {
			return !/^[\w]{8,}$/gi.test(input.value); 
		}

/* ------------ - END - user login form  - END - ------------ */



	/* ---------- catalog-menu ---------- */

		
		let 
			wW = $(window).width(),
			wH = $(window).height();


		let menu                 = $('.catalog-menu');
		if(menu.length) {
			let container = menu.parent(),
				containerYOffset = container.offset().top,
				containerHeight = $('.main').height();

			setTimeout(function () {
				stopPoint = ($('.footer').offset().top) - (wH / 2.3);
			}, 300);

			function fixedMenu(stopPoint) {

				if (pageYOffset > containerYOffset && pageYOffset < stopPoint) {
					container.addClass('fixed');
					container.removeClass('stopPoint');
				} else if (pageYOffset > containerYOffset && pageYOffset > stopPoint) {
					container.addClass('stopPoint');
				} else if (pageYOffset < containerYOffset) {
					container.removeClass('fixed');
				}
			}

			$(window).on('scroll', function (e) {
				fixedMenu(stopPoint);
			});


			$(window).on('resize', function(){
				setTimeout(function(){
					stopPoint = ($('.footer').offset().top) - (wH / 2.3);
				}, 300);
				fixedMenu(stopPoint);
			});
		}

		
	/* ---------- colorpic ---------- */	

		let 
			colorpicItem      = $('.colorpic').find('.colorpic-list-item'),
			catalogItem       = $('.catalog-list-item'),
			catalogItemWidth  = catalogItem.width(),
			catalogItemHeight = catalogItemWidth,
			pickedColor       = [];


		colorpicItem.on('click', function(){

			if($(this).hasClass('active')) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}
			
			pickedColor      = getPicked();
			pickedColorArray = Object.values(pickedColor);

			if($.inArray(true, pickedColorArray) != -1) {
				selectPicked(pickedColor);
			} else {
				setTimeout(function(){
					stopPoint = ($('.footer').offset().top) - (wH / 2.3);
				}, 300);
				catalogItem.removeClass('active disabled');
			}

			if($.inArray(false, pickedColorArray) === -1) {
				setTimeout(function(){
					stopPoint = ($('.footer').offset().top) - (wH / 2.3);
				}, 300);
				catalogItem.removeClass('active disabled');
			}

		});

	/* Перебираем колорпики,
		если есть класс актив - добавляем в массив выбранных элементов
		pickedColor[color] = true/false.
	*/

		function getPicked(){

			colorpicItem.each(function(){
				if($(this).hasClass('active')) {
					pickedColor[$(this).attr('data')] = true; 
				} else {
					pickedColor[$(this).attr('data')] = false;
				}
			});

			return pickedColor;
		}


	/* Перебираем элементы списка каталога,
		атрибут data="color" проверяем в массиве отмеченных колорпиков,
		если значение для него равно true, то отображаем соответствующие элементы
		из списка каталога, иначе - скрываем.
		
	*/

		function selectPicked(pickedColor){

			catalogItem.each(function(){
				if(pickedColor[$(this).attr('data')]){
					$(this).removeClass('disabled').addClass('active');
				} else {
					$(this).removeClass('active').addClass('disabled');
				}
			});

			setTimeout(function(){
				stopPoint = ($('.footer').offset().top) - (wH / 2.3);
			}, 300);

			fixedMenu(stopPoint);

			if(!$('.header__all-product-background').hasClass('active')){
				$('html, body').animate({
		        	scrollTop: $(".catalog-list").offset().top
		    	}, 0);
			}

		}

		$(window).on('load', function(){

		});

		$(window).on('resize', function(){
		
		});


/* all product */

		let
			allProduct           = $('#allProduct'),
			allProductBackground = $('.header__all-product-background'),
			allProductClose      = $('.all-product-close'),
			mainLeftSide         = $('.main__left-side'),
			logoMobile           = $('.logo-mobile'),
			fixedContainer       = $('.fixed-container');


		allProduct.on('click', function(){

			$('html, body').animate({
	        	scrollTop: 0
	    	}, 300);

	    	fixedContainer.addClass('all-product');

			allProduct.hide();
			mainLeftSide.show();

			allProductBackground.addClass('active');

			$('body').addClass('lock');

			logoMobile.addClass('logo-mobile--white');

			$('.page-list').find('.logo').hide();
		});

		allProductClose.on('click', function(){
			allProduct.show();
			mainLeftSide.hide();

			allProductBackground.removeClass('active');

			$('body').removeClass('lock');

			logoMobile.removeClass('logo-mobile--white');

			fixedContainer.removeClass('all-product');

			$('.page-list').find('.logo').show();
		});

		colorpicItem.on('click', function(){
			
			let wW = $(window).width();

			if(wW < 960){
				allProduct.show();
				mainLeftSide.hide();

				allProductBackground.removeClass('active');

				$('body').removeClass('lock');

				logoMobile.removeClass('logo-mobile--white');

				fixedContainer.removeClass('all-product');
			}
		});


		$(window).on('resize', function(){

			let wW = $(window).width();

			if($('.logo-mobile').hasClass('logo-mobile--white') && wW < 960) {
				$('.page-list').find('.logo').hide();
			}

			else if($('.logo-mobile').hasClass('logo-mobile--white') && wW > 960){
				$('.page-list').find('.logo').show();
			}

			else if(!$('.logo-mobile').hasClass('logo-mobile--white') && wW > 768){
				$('.page-list').find('.logo').show();
			}

			if(wW > 960){
				/*$('body').removeClass('lock');*/

				/*if(!$('.main__left-side').find('.fixed-container').hasClass('all-product')){
					mainLeftSide.show();
				}*/
			}
		});


		/*$(window).on('resize', function(){
			let wW = $(window).width(),
				fixedContainer = $('main__left-side').find('.fixed-container');

			if(wW > 960){
				mainLeftSide.show();
				allProductBackground.removeClass('active');

				$('body').removeClass('lock');
				logoMobile.removeClass('logo-mobile--white');
				fixedContainer.removeClass('all-product');
			} else if(!fixedContainer.hasClass('active')){

			}
		});*/


		$('.gallery').slick({
		  	infinite: true,
		  	accessibility: false,
		  	slidesToShow: 2,
		  	/*draggable: true,*/

		  	responsive: [{

		      breakpoint: 1126,
		      settings: {
		        slidesToShow: 1
		      }

		    }/*, {

		      breakpoint: 600,
		      settings: {
		        slidesToShow: 2
		      }

		    }, {

		      breakpoint: 300,
		      settings: "unslick" // destroys slick

		    }*/]

		});


		let slides       = $('.gallery').find('.slick-slide');

		if(slides.length){

			let 
				slidesInfo   = new Array(),
				slidesCount  = 0,
				currentSlide = 0;

			slides.each(function(){

				if(!$(this).hasClass('slick-cloned')){
					slidesCount++;
				}

				slidesInfo['slidesCount'] = slidesCount;

				return slidesInfo;

			});	


			setInterval(function(){

				let index = 0;

				slides.each(function(){

					if(!$(this).hasClass('slick-cloned') && $(this).hasClass('slick-current')){

						index = $(this).attr('data-slick-index');
						index++;
						slidesInfo['currentSlide'] = index;
					}

					return slidesInfo;			
				});

				$('.paginator__current').html(slidesInfo['currentSlide']);
				$('.paginator__count').html(slidesInfo['slidesCount']);


			}, 1000);

			$('.paginator').appendTo('.slick-next');
		}
	
	}); /* document.ready */
})(jQuery);
