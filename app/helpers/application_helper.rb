module ApplicationHelper
  def markdown(text)
    rndr = Redcarpet::Render::HTML.new(:no_links => true, :hard_wrap => true)
    mkd = Redcarpet::Markdown.new(rndr,:fenced_code_blocks => true)
    syntax_highlighter(mkd.render(text)).html_safe
  end

  def syntax_highlighter(html)
    #DO install pygment first, bundler won't take care of this for you
    doc = Nokogiri::HTML(html)
    doc.search("//pre[@lang]").each do |pre|
      pre.replace Albino.colorize(pre.text.rstrip, pre[:lang])
    end
    doc.to_s
  end
end



