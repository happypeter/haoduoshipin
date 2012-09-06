$("#show_note_btn").click(function() {
  $("#show_comment_btn").removeClass("active");
  $("#show_note_btn").addClass("active");
  $('.comment_view').hide();
  $('.show_notes').show();
  return false
});
$("#show_comment_btn").click(function() {
  $("#show_note_btn").removeClass("active");
  $("#show_comment_btn").addClass("active");
  $('.show_notes').hide();
  $('.comment_view').show();
  return false
});

$("#comment_btn").click(function() {
  if ($.trim($('#new_comment textarea').val()) == "") 
  {
      $('#new_comment .error').show();
      return false
  }
});

$('#markdown_cheatsheet').modal({
  show: false
})

$('#jquery_jplayer_1').bind('click', function(e) {
  if ($('.jp-play').is(':visible')) 
  {
    return $(this).jPlayer('play');
  } 
  else 
  {
    return $(this).jPlayer('pause');
  }
});
