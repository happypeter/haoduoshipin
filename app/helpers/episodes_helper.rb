module EpisodesHelper
  def episode_video_tag(episode)
    video_tag self.video_url(episode), :poster => "http://media.happycasts.net/episodes/stills/load.png", :width => 960, :height => 720 
  end
  def video_url(ep)
    "http://media.happycasts.net/assets/episodes/videos/#{ep.asset_name}.mov"
  end
end
