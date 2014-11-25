class Hearting < ActiveRecord::Base
  attr_accessible :hearted_episode_id, :heart_id

  belongs_to :hearted_episode, class_name: "Episode"
  belongs_to :heart, class_name: "User"
end
