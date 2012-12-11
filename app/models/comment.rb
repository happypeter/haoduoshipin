class Comment < ActiveRecord::Base
  belongs_to :episode, :counter_cache => true
  belongs_to :user

  validates_presence_of :content, :episode_id

  scope :recent, order("created_at DESC")
end
