class Issue < ActiveRecord::Base
  attr_accessible :title, :content, :user_id, :closed
  has_many :comments, :as => :commentable, :dependent => :destroy
  belongs_to :user

  scope :open, -> { where(closed: false) }
  scope :closed, -> { where(closed: true) }

  def commenters
    all = []
    all = self.comments.collect(&:user_id)
    all << User.find_by(name: 'happypeter').id # happypeter is the author of all episodes
    all.uniq
  end
end
