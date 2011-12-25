require "builder"
module ApplicationHelper
  def markdown(text)
    options = [:hard_wrap, :autolink, :no_intraemphasis, :fenced_code, :gh_blockcode]
    syntax_highlighter(Redcarpet.new(text, *options).to_html).html_safe
  end

  def syntax_highlighter(html)
    #DO install pygment first, bundler won't take care of this for you
    doc = Nokogiri::HTML(html)
    doc.search("//pre[@lang]").each do |pre|
      pre.replace Albino.colorize(pre.text.rstrip, pre[:lang])
    end
    doc.to_s
  end
  def video_tag(path, options = {})
    xml = Builder::XmlMarkup.new
    xml.video :width => options[:width], :height => options[:height], :poster => options[:poster], :controls => "controls", :preload => "none" do
      xml.source :src => "#{path}.mp4", :type => "video/mp4"
      xml.source :src => "#{path}.m4v", :type => "video/mp4"
      xml.source :src => "#{path}.webm", :type => "video/webm"
      xml.source :src => "#{path}.ogv", :type => "video/ogg"
    end.html_safe
  end
end



