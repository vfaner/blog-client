
$(window).on('scroll' ,function () {
  document.documentElement.scrollTop + document.body.scrollTop > 0 ? $('.rollbar').css("display","block") : $('.rollbar').css("display","none")
  document.documentElement.scrollTop + document.body.scrollTop > 0 ? $('.header').addClass('scrolled') : $('.header').removeClass('scrolled')
  document.documentElement.scrollTop + document.body.scrollTop > 0 ? $('.oldtb').addClass('scrolled') : $('.oldtb').removeClass('scrolled')
})
