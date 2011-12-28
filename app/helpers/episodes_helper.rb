module EpisodesHelper
  def episode_video_tag(episode)
    video_tag episode.asset_url("videos"), :poster => "http://media.happypeter.org/happycasts/episodes/stills/load.png", :width => 1024, :height =>768 
  end
end
