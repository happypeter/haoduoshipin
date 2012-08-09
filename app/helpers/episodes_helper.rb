module EpisodesHelper
  def video_url(ep)
    "http://media.happycasts.net/assets/episodes/videos/#{ep.asset_name}.mov"
  end
end
