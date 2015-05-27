// credit where credit's due;
// http://thecodeplayer.com/walkthrough/ripple-click-effect-google-material-design

var element, circle, d, x, y;
$(".md-btn").click(function(e){
  element = $(this);

  if(element.find(".md-circle").length == 0)
    element.prepend("<span class='md-circle'></span>");

  circle = element.find(".md-circle");
  circle.removeClass("animate");

  if(!circle.height() && !circle.width())
  {
    d = Math.max(element.outerWidth(), element.outerHeight());
    circle.css({height: d, width: d});
  }

  x = e.pageX - element.offset().left - circle.width()/2;
  y = e.pageY - element.offset().top - circle.height()/2;

  circle.css({top: y+'px', left: x+'px'}).addClass("animate");
});
