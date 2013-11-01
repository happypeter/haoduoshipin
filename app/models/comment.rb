class Comment < ActiveRecord::Base
  belongs_to :episode, :counter_cache => true
  belongs_to :user
  has_many :notifications, :dependent => :destroy

  validates_presence_of :content, :episode_id

  scope :recent, order("created_at DESC")
  after_create :send_notifications

  private

  def send_notifications
    self.episode.commenters.each do |id|
      Notification.create(user_id: id, comment_id: self.id) unless id == self.user_id
    end
  end

end
