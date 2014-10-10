class Episode < ActiveRecord::Base
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  has_many :comments, :dependent => :destroy
  has_many :taggings, :dependent => :destroy
  has_many :tags, :through => :taggings
  validates_presence_of :name

  scope :recent, -> { order(id: :desc) }

  after_create :set_seconds_and_ratio
  attr_accessible :name, :notes, :published_at, :revision, :published, :description, :ratio, :seconds, :tag_names

  def get_video_duration
    result = `avconv -i http://media.happycasts.net/assets/episodes/videos/#{asset_name}.mov 2>&1`
    if result =~ /Duration: ([\d][\d]:[\d][\d]:[\d][\d].[\d]+)/
      return $1.to_s
    end
    return "avconv error"
  end

  def should_be_published?
    if self.published_at < Time.now
      self.published = true
      self.save
      true
    else
      false
    end
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

  def commenters
    all = []
    all = self.comments.collect(&:user_id)
    all << User.find_by(name: 'happypeter').id # happypeter is the author of all episodes
    all.uniq
  end

  private

  def set_seconds_and_ratio
    du = get_video_duration
    a = du.split(':')
    self.seconds = a[0].to_i*3600 + a[1].to_i*60 + a[2].to_i
    # self.ratio = 16.0/9.0 # for imac
    self.ratio = 1.6 # for macbook pro
    self.save
  end
end
