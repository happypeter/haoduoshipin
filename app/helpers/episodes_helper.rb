module EpisodesHelper
  def video_url(ep)
    "http://media.happycasts.net/assets/episodes/videos/#{ep.asset_name}.mov"
  end

  def social_share_button_tag(title = "", opts = {}, allowed_sites = [])
    extra_data = {}
    rel = opts[:rel]
    html = []
    html << "<div class='social-share-button' data-title='#{h title}' data-img='#{opts[:image]}' data-url='#{opts[:url]}'>"

    allowed_sites.each do |name|
      extra_data = opts.select { |k, _| k.to_s.start_with?('data') } if name.eql?('tumblr')

      link_title = t "social_share_button.share_to", :name => t("social_share_button.#{name.downcase}")
      html << link_to(h(link_title), "#", {:rel => ["nofollow", rel],
        "data-site" => name,
        :class => "social-share-button-#{name}",
        :onclick => "return SocialShareButton.share(this);",
        :title => h(link_title)}.merge(extra_data))
    end
    html << "</div>"
    raw html.join("\n")
  end
end
