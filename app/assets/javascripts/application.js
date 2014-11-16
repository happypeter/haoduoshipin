//= require jquery
//= require jquery_ujs
//= require social-share-button
//= require vendor/jquery.timeago
//= require vendor/jquery.timeago.zh-CN
//= require jquery.atwho
//= require jquery-ui/autocomplete
//= require_self

$(function() {
  var commenter = [];
  var commenter_exist = [];
  var search_values = [];
  var options = $(".search-options option");
  for ( var i = 0; i < options.length; i++) {
    search_values.push(options[i].value);
  }
  $( "#ts-search-input" ).autocomplete({
    source: search_values
  });
  $(".search-options").remove();
  $('.comment_head a').each(function() {
    if($.inArray($(this).text(), commenter_exist) < 0) {
      commenter.push($(this).text());
      commenter_exist.push($(this).text());
    }
  });
  $('textarea').atwho({ at: "@", 'data': commenter });
  $(".search-btn").click(function() {
    $(".search-form").slideToggle();
    $("#ts-search-input").focus();
    $("#ts-search-input").val('');
  });
});
