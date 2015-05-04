class HappyMailer < ActionMailer::Base
  default from: "no-reply@haoduoshipin.com"

  def mail_to_all(uid, mailbody)
    @mailbody = mailbody
    @user = User.find(uid)
    mail(:to => @user.email, :subject => "haoduoshipin")
  end

  def new_ep_release(uid, episode_id)
    @episode = Episode.find(episode_id)
    @user = User.find(uid)
    mail(:to => @user.email, :subject => "haoduoshipin:#{@episode.name}")
  end

  def password_reset(uid)
    @user = User.find(uid)
    mail(:to => @user.email, :subject => "Password Reset")
  end
end
