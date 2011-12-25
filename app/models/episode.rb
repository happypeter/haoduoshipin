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
    "hello"
  end

end
