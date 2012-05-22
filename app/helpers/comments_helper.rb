module CommentsHelper
  def format_comment(comment)
      CodeFormatter.new(comment.content).to_html.html_safe
  end

  def keep_spaces_at_beginning(content)
    content.split("\n").map do |line|
      line.sub(/^ +/) do |spaces|
        '&nbsp;' * spaces.length
      end
    end.join("\n")
  end

  def fix_url(url)
    if url =~ /^https?\:\/\//
      url
    else
      "http://#{url}"
    end
  end
end
