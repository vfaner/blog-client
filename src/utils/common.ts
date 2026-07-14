export class Common {
  hidetp () {
    if ($('.speedbar').css('display') === 'block') {
      $('.speedbar').css('display', 'none')
    } else {
      $('.speedbar').css('display', 'block')
    }
  }
}
