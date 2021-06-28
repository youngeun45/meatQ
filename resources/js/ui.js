$(function(){
    popupUI();
	tapMotion();
	spinnerUi();
	faqUi();

})
/* 레이어 팝업 */
var $popSpeed = 300,
	$popOpenBtn = '';
var popupUI = function(){
	$(document).on('click','.ui-pop-open',function(e) {
		e.preventDefault();
		var $pop = $(this).attr('href');
		popOpen($pop,this);
	});
	$(document).on('click','.ui-pop-close',function(e) {
		e.preventDefault();
		var $pop = $(this).closest('.pop_wrap');
		popClose($pop);
	});

	/*
	//팝업 bg 클릭시 닫힘 기능
	$('.pop_wrap').on('click',function(){
		var $pop = $(this);
		if(!$pop.hasClass('close_none')){popClose($pop);} 	//배경 클릭시 안닫히게 할때는 close_none 클래스 추가로 처리
	}).on('click','.popup',function(e) {
		e.stopPropagation();
	});
	*/
};
var popOpen = function(tar,btn){
	if($(tar).length < 1 || $(tar).children('.popup').length < 1) return console.log('해당팝업없음');
	var $visible = $('.pop_wrap:visible').size();
	if(btn != null || btn != window)$popOpenBtn = $(btn);
	if($visible > 0){
		$(tar).css('z-index','+='+$visible);
	}
	$('body').addClass('pop_open');	
	$(tar).fadeIn($popSpeed,function(){
		$(this).attr({'tabindex':0}).focus();
	});
};
var popClose = function(tar){
	var $visible = $('.pop_wrap:visible').size();
	if($visible == 1){
		$('body').removeClass('pop_open');
	}
	$(tar).find('.popup').animate({'margin-top':0},$popSpeed,function(){
		$(this).removeAttr('style');
	});
	$(tar).fadeOut($popSpeed,function(){
		$(tar).removeAttr('tabindex');
		if($popOpenBtn != ''){
			if($popOpenBtn != window){
				$popOpenBtn.focus();
			}
			$popOpenBtn = '';
		}
	});
};
function tapMotion(){
	var $tab = $('.tab_motion'),
		$wrap = $('.tab_wrap');
	$tab.on('click','a',function(e) {
		if(!$(this).parent().hasClass('on')){
			var href = $(this).attr('href');		
			$(href).show().siblings('.tab_cont').hide();
			$(this).parent().addClass('on').siblings().removeClass('on');
			$(this).parents('.tabmenu').removeClass('tab_open')
		}else{
			$(this).parents('.tabmenu').toggleClass('tab_open')
		}
		e.preventDefault();
	});
	if($('.tab_motion').size() > 0){
		$(window).load(function(){
			$('.tab_motion').each(function() {
				$(this).children('li').eq(0).children('a').trigger('click');	
			}); 		
		});
	}
}
var spinnerUi = function(max){
	//spinner
	if ($('.spinner').size() > 0) {

		//max값이 지정되있을때
		if (null != max && 0 < max) {
			$('.spinner').spinner({
				min: 0,
				max: max,
				create: function (event, ui) {
					//add custom classes and icons
					$(this)
						.next().html('<i class="icon icon-plus">더하기</i>')
						.next().html('<i class="icon icon-minus">빼기</i>');
				}
			});
		} else {
			$('.spinner').spinner({
				min: 0,
				create: function (event, ui) {
					//add custom classes and icons
					$(this)
						.next().html('<i class="icon icon-plus">더하기</i>')
						.next().html('<i class="icon icon-minus">빼기</i>');
				}
			});
		}
	}
}
var spinnerStepUi = function(step){
	//spinner
	if ($('.spinner-step').size() > 0) {
		$('.spinner-step').spinner({
			min: 0,
			step: step,
			create: function (event, ui) {
				//add custom classes and icons
				$(this)
					.next().html('<i class="icon icon-plus">더하기</i>')
					.next().html('<i class="icon icon-minus">빼기</i>');
			}
		});
	}
}
var faqUi = function(){
	$(document).on('click','.faq-ui > li > button',function(){
		$(this).next('div').slideToggle(300).parent().toggleClass('on').siblings('li').removeClass('on').children('div').slideUp(300);
	});
}
