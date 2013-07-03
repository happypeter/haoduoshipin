class Notification < ActiveRecord::Base
  attr_accessible :comment_id, :unread, :user_id
  belongs_to :user
  belongs_to :comment
  scope :recent, order("created_at DESC")
end
