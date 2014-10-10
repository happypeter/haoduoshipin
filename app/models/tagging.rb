class Tagging < ActiveRecord::Base
  attr_accessible :episode_id, :tag_id
  belongs_to :episode
  belongs_to :tag
end
