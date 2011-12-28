module EpisodesHelper
  def episode_video_tag(episode)
    video_tag episode.asset_url("videos"), :poster => "http://media.happypeter.org/happycasts/episodes/stills/load.png", :width => 768, :height =>576 
  end
end
