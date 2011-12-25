module EpisodesHelper
  def episode_video_tag(episode)
    video_tag episode.asset_url("videos"), :poster => "/assets/episodes/posters/loading.png", :width => 960, :height => 600
  end
end
