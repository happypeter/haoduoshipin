//= require jquery
//= require jquery_ujs
//= require_self
//= require_tree .
// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
$(function() {
  if ($("#episode").length > 0) {
    $("#episode .nav a.tab").click(function(e) {
      $("#episode .nav li a").removeClass("selected");
      $(this).addClass("selected");
      $("#episode .nav_section").append('<div class="progress"><img src="/images/progress_large.gif" width="32" height="32" alt="" /></div>');
      $.getScript(this.href); /* this will trigger show.js.erb */
      if (history && history.replaceState) { /*see RC#246*/
        history.replaceState(null, document.title, this.href);
      }
      e.preventDefault();
    });

    $(".markdown_link").live("click", function(e) {
      $(this).next(".markdown_examples").slideToggle();
    });

    $(".clippy").live({
      'clippycopy': function(e, data) {
        data.text = $(this).children(".clippy_code").text();
      },
      'clippyover': function() {
        $(this).children(".clippy_label").text("copy to clipboard");
      },
      'clippyout': function() {
        $(this).children(".clippy_label").text("");
      },
      'clippycopied': function() {
        $(this).children(".clippy_label").text("copied");
      }
    });
  }
});
