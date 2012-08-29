$("#create_account_btn").click(function() {
  if ($.trim($('#signup_form input#user_name').val()) == "") 
  {
    alert("Username is empty");
    return false;
  }
  if ($.trim($('#signup_form input#user_password').val()) == "") 
  {
    alert("Password is empty");
    return false;
  }
  if ($('#signup_form input#user_password').val() != $('#signup_form input#user_password_confirmation').val())
  {
    alert("Passwords do not match");
    return false;
  }
});
