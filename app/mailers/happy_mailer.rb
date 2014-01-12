class HappyMailer < ActionMailer::Base
  default from: "no-reply@happycasts.net"
  include Resque::Mailer
  def mail_to_all(user, mailbody)
    @mailbody = mailbody
    @user = user
    mail(:to => "#{user.name} <#{user.email}>", :subject => "Happycasts")
  end

  def new_ep_release(user_id, episode_id)
    @episode = Episode.find(episode_id)
    user = User.find(user_id)
    mail(:to => "#{user.name} <#{user.email}>", :subject => "Happycasts:#{@episode.name}")
  end

  def password_reset(user)
    @user = user
    mail :to => user.email, :subject => "Password Reset"
  end
end
