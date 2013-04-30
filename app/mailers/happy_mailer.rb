class HappyMailer < ActionMailer::Base
  default from: "no-reply@happycasts.net"
  def mail_to_all(user, mailbody)
    @mailbody = mailbody
    @user = user
    mail(:to => "#{user.name} <#{user.email}>", :subject => "Happycasts")
  end
  def password_reset(user)
    @user = user
    mail :to => user.email, :subject => "Password Reset"
  end
end
