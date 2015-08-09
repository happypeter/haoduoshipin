//= require jquery
//= require jquery_ujs
//= require social-share-button
//= require vendor/jquery.timeago
//= require vendor/jquery.timeago.zh-CN
//= require jquery.tooltipster.min.js
//= require jquery.atwho
//= require qrcode
//= require vendor/ace/ace
//= require vendor/ace/mode-markdown
//= require vendor/ace/theme-twilight
//= require material-design-button
//= require_self

$(function() {
  // @commenter
  var commenter_exist = [];
  $('.comment .heading a').each(function() {
    if($.inArray($(this).text(), commenter_exist) < 0) {
      commenter_exist.push($(this).text());
    }
  });
  $('textarea').atwho({ at: "@", 'data': commenter_exist });


  // star episodes
  $(".heart-btn").click(function() {
    var block = $(this);
    var url = $(this).data("url");
    $.post(url, function(result) {
      block.find("b").text(result.episode_hearts);
      block.find("i").addClass("yellow");
    });
  });

  // switch between comments and stared episodes
  $(".profile-stats .label").click(function() {
    var title = $(this).data("title");
    $(".profile-stats .label").removeClass("active");
    $(this).addClass("active");
    $(".profile-" + title).css("display", "block");
    if(title == "episodes") {
      $(".profile-comments").css("display", "none");
    }else{
      $(".profile-episodes").css("display", "none");
    }
  });

  // tooltip
  $('.tooltip').tooltipster();

  // disable the comment submit button
  $('.new_comment .btn-submit').click(function() {
    if($("#comment_content").val().trim().length == 0) {
      alert("评论不能为空！");
      return false;
    }
    $(this).val("提交中...");
    $('.new_comment').submit();
    $(this).prop("disabled", true);
    return false; // prevented from submitting the form twice on IE
  });

  // send mails
  $(".mail-btn").click(function() {
    if($('.eid-form').is(':visible')) {
      $('.eid-form').css("display", "none");
      $('#eid').val('');
    } else {
      $('.eid-form').css("display", "inline-block");
      $('#eid').focus();
    }
  });

  // autocomplete episodes titles
  $(".search-btn").click(function() {
    $(".search-form").slideToggle();
    // $(".swiftype-widget").slideToggle();
    $("#st-search-input").focus();
    $("#st-search-input").val('');
  });

  // issues state
  $(".issue-state a").click(function() {
    $(".issue-state a").removeClass("active");
    $(this).addClass("active");
  });
});
