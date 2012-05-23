class Episode < ActiveRecord::Base
  has_many :comments, :dependent => :destroy
  has_many :taggings, :dependent => :destroy
  has_many :tags, :through => :taggings

  scope :recent, order('id DESC')
  
  def asset_name
    [id.to_s.rjust(3, "0"), name].join("-")
  end
  # a virtual attribute
  def tag_names=(names)
    self.tags = Tag.with_names(names.split(/\s+/))
  end
  def tag_names
    tags.map(&:name).join(' ')
  end

end
