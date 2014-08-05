$("#comment_btn").click(function() {
  if ($.trim($('#new_comment textarea').val()) == "") 
  {
      $('#new_comment .error').show();
      return false
  }
});
