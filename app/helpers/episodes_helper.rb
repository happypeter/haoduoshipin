module EpisodesHelper
  def episode_video_tag(episode)
    video_tag episode.asset_url("videos"), :poster => "http://media.happypeter.org/happycasts/episodes/stills/load.png", :width => 960, :height => 600
  end
end
