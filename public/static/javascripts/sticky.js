
var StickySection = function(element) {

  var stickyPosition = parseInt(element.offsetTop)
  window.addEventListener('scroll', function() {

    var scrollY = window.scrollY;

    if (scrollY > stickyPosition) {
      element.classList.add('sticky-js-fixed')
    } else {
      element.classList.remove('sticky-js-fixed')
    }

  })

}


document.addEventListener('DOMContentLoaded', function() {

  var element;

  for (element of document.querySelectorAll('.sticky-js')) {
    new StickySection(element);
  }

})