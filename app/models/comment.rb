class Comment < ActiveRecord::Base
  belongs_to :commentable, :polymorphic => true
  belongs_to :user
  has_many :notifications, :dependent => :destroy

  scope :recent, -> { order(created_at: :desc) }
  after_create :send_notifications
  attr_accessible :content, :episode_id, :user_id, :commentable_id, :commentable_type

  private

  def send_notifications
    self.commentable.commenters.each do |id|
      Notification.create(user_id: id, comment_id: self.id) unless id == self.user_id
    end
  end
end
