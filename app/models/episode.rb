class Episode < ActiveRecord::Base
  has_many :comments, :dependent => :destroy
  has_many :taggings, :dependent => :destroy
  has_many :tags, :through => :taggings
  validates_presence_of :name

  scope :recent, order('id DESC')
  after_create :set_seconds

  def get_video_duration
    result = `avconv -i http://media.happycasts.net/assets/episodes/videos/#{asset_name}.mov 2>&1`
    if result =~ /Duration: ([\d][\d]:[\d][\d]:[\d][\d].[\d]+)/
      return $1.to_s
    end
    return "avconv error"
  end

  def set_seconds
    du = get_video_duration
    a = du.split(':')
    self.seconds = a[0].to_i*3600 + a[1].to_i*60 + a[2].to_i
    self.save
  end

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

  searchable do
    text :name, :description
  end
end
