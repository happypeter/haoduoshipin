class Episode < ActiveRecord::Base
  def asset_name
    [padded_position, permalink].join('-')
  end
  def asset_url(path, ext = nil)
    "http://media.railscasts.com/assets/episodes/#{path}/#{asset_name}" + (ext ? ".#{ext}" : "")
  end
  def padded_position
    position.to_s.rjust(3, "0")
  end
  def permalink
    "hello"
  end

end
