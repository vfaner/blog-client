import $ from 'jquery'

$(function () {
  $('a').not('.close_login_box').each(function () {
    if (this.title) {
      const c = this.title
      const a = 30
      $(this).mouseover(function (d: JQuery.MouseOverEvent<HTMLElement, null, HTMLElement, HTMLElement>) {
        this.title = ''
        $('body').append("<div id='tooltip'>" + c + '</div>')
        $('#tooltip').css({
          left: (d.pageX + a) + 'px',
          top: d.pageY + 'px',
          opacity: '0.8'
        }).show(250)
      }).mouseout(function () {
        this.title = c
        $('#tooltip').remove()
      }).mousemove(function (d) {
        $('#tooltip').css({
          left: (d.pageX + a) + 'px',
          top: d.pageY + 'px'
        })
      })
    }
  })
  $('span').not('.close_login_box').each(function () {
    if (this.title) {
      const c = this.title
      const a = 30
      $(this).mouseover(function (d: JQuery.MouseOverEvent<HTMLElement, null, HTMLElement, HTMLElement>) {
        this.title = ''
        $('body').append('<div id="tooltip">' + c + '</div>')
        $('#tooltip').css({
          left: (d.pageX + a) + 'px',
          top: d.pageY + 'px',
          opacity: '0.8'
        }).show(250)
      }).mouseout(function () {
        this.title = c
        $('#tooltip').remove()
      }).mousemove(function (d) {
        $('#tooltip').css({
          left: (d.pageX + a) + 'px',
          top: d.pageY + 'px'
        })
      })
    }
  })
})
