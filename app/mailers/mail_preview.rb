class MailPreview < MailView
  def new_ep_release
    user = User.first
    episode = Episode.last
    HappyMailer.new_ep_release(user.id, episode.id)
  end
end
