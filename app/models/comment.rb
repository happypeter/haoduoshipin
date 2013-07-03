class Comment < ActiveRecord::Base
  belongs_to :episode, :counter_cache => true
  belongs_to :user
  has_many :notifications

  validates_presence_of :content, :episode_id

  scope :recent, order("created_at DESC")
  after_create :send_notifications

  private
  def here_users
    all = []
    self.episode.comments.each do |c|
      all << c.user
    end
    all << User.find_by_name('happypeter') # happypeter is the author of all episodes
    all.uniq
  end

  def send_notifications
    here_users.each do |u|
      Notification.create(user_id: u.id, comment_id: self.id) unless u.id == self.user_id
    end
  end

end
