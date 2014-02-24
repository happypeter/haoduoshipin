class MailPreview < MailView
  def new_ep_release
    user = Struct.new(:email, :name).new("tom@gmail.com", "Tom")
    episode = Episode.last
    HappyMailer.new_ep_release(user, episode.id)
  end
end
