class NotificationUpdater
  @queue = :notification_queue
  def self.perform(episode_id, user_id)
    user = User.find(user_id)
    user.notifications.each do |n|
      n.update_attributes!(unread: false) if n.comment.episode_id == episode_id
    end
  end
end