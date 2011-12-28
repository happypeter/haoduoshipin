require "builder"
module ApplicationHelper
  def textilize(text)
    CodeFormatter.new(text).to_html.html_safe unless text.blank?
  end
  def markdown(text)
    options = [:hard_wrap, :autolink, :no_intraemphasis, :fenced_code, :gh_blockcode]
    syntax_highlighter(Redcarpet.new(text, *options).to_html).html_safe
  end

  def tab_link(name, url)
    selected = url.all? { |key, value| params[key] == value }
    link_to(name, url, :class => (selected ? "selected tab" : "tab"))
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
    xml.video :class => "sublime",:width => options[:width], :height => options[:height], :poster => options[:poster],  :preload => "none" do
      xml.source :src => "#{path}.mov"
    end.html_safe
  end
end



