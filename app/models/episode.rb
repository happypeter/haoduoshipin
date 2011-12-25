class Episode < ActiveRecord::Base
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
      {:name => "mp4",         :info => "Full Size H.264 Video",  :url => asset_url("videos", "mp4"),  :size => 1},
      {:name => "mov",         :info => "Smaller H.264 Video",    :url => asset_url("videos", "mov"),  :size => 1},
    ]
  end

  # TODO test me
  def available_files
    files.select { |f| f[:size].to_i > 0 }
  end

end
