class MailPreview < MailView
  def new_ep_release
    user = User.first
    episode = Episode.last
    HappyMailer.new_ep_release(user.id, episode.id)
  end

  def password_reset
    user = User.first
    HappyMailer.password_reset(user.id)
  end
end
