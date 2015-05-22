class Episode < ActiveRecord::Base
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  has_many :comments, :as => :commentable, :dependent => :destroy
  has_many :taggings, :dependent => :destroy
  has_many :tags, :through => :taggings

  has_many :heartings, :foreign_key => "hearted_episode_id", :dependent => :destroy
  has_many :hearts, :through => :heartings

  validates_presence_of :name, :tag_names
  scope :recent, -> { order(id: :desc) }

  attr_accessible :name, :note, :published_at, :revision, :published, :description, :ratio, :seconds, :tag_names, :baidu

  after_create :swiftype_index_episode
  after_create :set_ratio

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
    # tag_names as a token for checking update action or create action
    names = 'all' if names.empty? && !tag_names.empty?
    self.tags = Tag.with_names(names.split(/\s+/), tag_names)
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

  def set_ratio
    # self.ratio = 16.0/9.0 # for imac
    # 以前是视频长宽比是最早 4:3 后来 16：9，现在时 16：10 了，未来如果变了，直接改这里就行
    self.ratio = 1.6 # for macbook pro
    self.save
  end

  def swiftype_index_episode
    client = Swiftype::Client.new
    url = "http://haoduoshipin.com/v/#{self.id}"
    document = {
      :external_id => self.id,
      :fields => [{:name => 'title', :value => self.name, :type => 'string'},
        {:name => 'description', :value => self.description, :type => 'text'},
        {:name => 'created_at', :value => self.created_at.iso8601, :type => 'date'},
        {:name => 'asset_name', :value => self.asset_name, :type => 'enum'},
        {:name => 'note', :value => self.note, :type => 'text'},
        {:name => 'url', :value => url, :type => 'enum'},
        {:name => 'revision', :value => self.revision, :type => 'integer'}]
    }
    client.create_or_update_document('hdsp', 'episodes', document)
  end
end
