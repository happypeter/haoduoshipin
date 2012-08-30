$(".actions").hide()

$(".comment_body").mouseover(function() {
   $(this).find("ul.actions").show();
 }).mouseout(function() {
   $("ul.actions").hide();
   });

$(".btn").mouseover(function() {
   $(this).addClass("btn-primary");
 }).mouseout(function() {
   $(this).removeClass("btn-primary");
   });
