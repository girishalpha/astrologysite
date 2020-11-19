/*------------------------------------------------------------------
[Master Javascript]

Project: Astrology
Version: 1.0
-------------------------------------------------------------------*/

(function($){
  "use strict";
  
  // ready function
	jQuery(document).ready(function($) {
   		var $this = $(window);
   		
   // Menu show Hide
	var counter = 0;
	$('.ast_menu_btn').on("click", function(){
		if( counter === 0) {
			$('.ast_main_menu_wrapper').addClass('ast_main_menu_hide');
			$(this).children().removeAttr('class');
			$(this).children().attr('class','fa fa-close');
			counter++;
		}
		else {
			$('.ast_main_menu_wrapper').removeClass('ast_main_menu_hide');
			$(this).children().removeAttr('class');
			$(this).children().attr('class','fa fa-bars');
			counter--;
		}		
	});
	
	// Menu js for Position fixed
	$(window).scroll(function(){
		var window_top = $(window).scrollTop() + 1; 
		if (window_top > 300) {
			$('.ast_header_bottom').addClass('menu_fixed animated fadeInDown');
		} else {
			$('.ast_header_bottom').removeClass('menu_fixed animated fadeInDown');
		}
	});
		
	// Magnific Text Popup js
	$('.popup-with-zoom-anim').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
	
	// Video Js
	$('.popup-youtube').magnificPopup({
		disableOn: 0,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});
	
	// Gemstone Slider js
	$('.ast_service_slider .owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
	slideBy:1,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:4
        }
    }
    });
    
    // Testimonial Slider js
    $('.ast_testimonials_slider .owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
    });
    
    // for counter 
	$('.timer').appear(function() {
		$(this).countTo();
	});
	
	// Show Hide section
	loadmore(8);
	function loadmore(target){
		var cnt = 0;
		var chk = 0;
		$('.ast_tarot_box_wrapper .ast_tarot_box').each(function(){
			chk++;
			if($(this).css('display') != 'block'){
				$(this).show();
				cnt++;
				if(cnt == target){ return false;}
				if(chk == $('.ast_tarot_box_wrapper .ast_tarot_box').length){ $('.ast_tarot_box_wrapper a.ast_btn').hide();}
			}
		});
	}
	$('.ast_tarot_box_wrapper a.ast_btn').on('click' , function(){
		loadmore(4);
	});
	
	// Show Hide palmistry section
	loadmore_palm(2);
	function loadmore_palm(target){
		var cnt = 0;
		var chk = 0;
	    var lenght = $('.ast_palm_wrapper .ast_palm_section').length-1;
		$('.ast_palm_wrapper .ast_palm_section').each(function(){
		    chk++;
			if($(this).css('display') != 'block'){
				$(this).show();
				cnt++;
				if(cnt == target){ return false;}
				if(chk == lenght){
					$('#ast_loadmore').hide();
				}
			}
			if(chk == 3){
			  $('#ast_loadmore').hide();
			}
			
		});
	}
	$('#ast_loadmore').on('click' , function(){
		loadmore_palm(1);
	}); 
	
	// Contact Form Submition
	function checkRequire(formId , targetResp){
		targetResp.html('');
		var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
		var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
		var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
		var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
		var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
		var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
		var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
		var check = 0;
		$('#er_msg').remove();
		var target = (typeof formId == 'object')? $(formId):$('#'+formId);
		target.find('input , textarea , select').each(function(){
			if($(this).hasClass('require')){
				if($(this).val().trim() == ''){
					check = 1;
					$(this).focus();
					targetResp.html('You missed out some fields.');
					$(this).addClass('error');
					return false;
				}else{
					$(this).removeClass('error');
				}
			}
			if($(this).val().trim() != ''){
				var valid = $(this).attr('data-valid');
				if(typeof valid != 'undefined'){
					if(!eval(valid).test($(this).val().trim())){
						$(this).addClass('error');
						$(this).focus();
						check = 1;
						targetResp.html($(this).attr('data-error'));
						return false;
					}else{
						$(this).removeClass('error');
					}
				}
			}
		});
		return check;
	}
	$(".submitForm").on("click", function() {
		var _this = $(this);
		var targetForm = _this.closest('form');
		var errroTarget = targetForm.find('.response');
		var check = checkRequire(targetForm , errroTarget);
		if(check == 0){
			var formDetail = new FormData(targetForm[0]);
			formDetail.append('form_type' , _this.attr('form-type'));
			$.ajax({
				method : 'post',
				url : 'ajax.php',
				data:formDetail,
				cache:false,
				contentType: false,
				processData: false
			}).done(function(resp){
				if(resp == 1){
					targetForm.find('input').val('');
					targetForm.find('textarea').val('');
					errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
				}else{
					errroTarget.html('<p style="color:red;">Something went wrong please try again later.</p>');
				}
			});
		}
	});
	//Product carousel
			if($(".pro_slides_carousel, .pro_slider_thumbs").length > 0){
				$('.pro_slides_carousel').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					fade: true,
					asNavFor: '.pro_slider_thumbs'
				});
				$('.pro_slider_thumbs').slick({
					slidesToShow: 3,
					slidesToScroll: 1,
					asNavFor: '.pro_slides_carousel',
					dots: false,
					arrows: true,
					centerMode: true,
					focusOnSelect: true,
					draggable: false
				});
			}
	
		// product tabes
			$('ul.tabs li').click(function(){
				var tab_id = $(this).attr('data-tab');
				$('ul.tabs li').removeClass('current');
				$(this).addClass('current');
				$('.tab_content').removeClass('current');
				$("#"+tab_id).addClass('current');
			});
			
		// 	related productSub
			$('.ast_related_pro .owl-carousel').owlCarousel({
				loop:true,
				margin:10,
				dots:false,
				autoplay:true,
				nav:false,
				responsive:{
					0:{
						items:1
					},
					600:{
						items:2
					},
					1000:{
						items:4
					}
				}
			})
			
			// about slider
			
			var shadow = '0 20px 50px rgba(0,34,45,0.5)';

				function styles(item_id, x, y, z , opacity, shadow, index){
					$(item_id).css({
						transform: 'translate3d('+ x +'px, ' + y + 'px, ' + z +'px) ',
						opacity: opacity,
						'box-shadow': shadow,
						'z-index': index
					});
				}
				$('#one').click(function(){
					$('#one').addClass('focus');
					$('#two').removeClass('focus');
					styles('#first', 0, 0, 0, 1, shadow,8);
					styles('#second', -70, 55, -50, 0.6, 'none',7);
				}); 
				$('#two').click(function(){
					$('#one').removeClass('focus');
					$('#two').addClass('focus');
					styles('#first', -70, 55, -50, 0.6, 'none',7);
					styles('#second', 0, 0, 0, 1, shadow,8);
				});
	});
})();