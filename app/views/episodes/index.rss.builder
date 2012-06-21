xml.instruct! :xml, version: "1.0" 
xml.rss version: "2.0" do
  xml.channel do
    xml.title "Happycasts Episodes"
    xml.description "Linux Tips For Programmers"
    xml.link episodes_url

    @episodes.each do |ep|
      xml.item do
        xml.title ep.name
        xml.description ep.description
        xml.pubDate ep.published_at.to_s(:rfc822)
        xml.link episode_url(ep)
        xml.guid episode_url(ep)
      end
    end
  end
end
