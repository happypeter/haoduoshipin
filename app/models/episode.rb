class Episode < ActiveRecord::Base
  has_many :comments, :dependent => :destroy
  has_many :taggings, :dependent => :destroy
  has_many :tags, :through => :taggings

  scope :recent, order('position DESC')
  def asset_name
    [padded_position, permalink].join('-')
  end
  def asset_url(path, ext = nil)
    "http://media.happypeter.org/happycasts/episodes/#{path}/#{asset_name}" + (ext ? ".#{ext}" : "")
  end
  def padded_position
    position.to_s.rjust(3, "0") # so we need file name "001-xxx.mov" not "1-xxx.mov"
  end
  def permalink
    self.name #RC has sth smarter, will use later
  end
  def files
    [
      {:name => "mov",         :info => "HD Video",    :url => asset_url("videos", "mov"),  :size => 1}, #FIXME: size shall be fetched
    ]
  end
  
  # a virtual attribute
  def tag_names=(names)
    self.tags = Tag.with_names(names.split(/\s+/))
  end
  def tag_names
    tags.map(&:name).join(' ')
  end


  # TODO test me
  def available_files
    files.select { |f| f[:size].to_i > 0 }
  end

end
