module ApplicationHelper
  class HTMLwithPygments < Redcarpet::Render::HTML
    def block_code(code, language)

      # 不知为什么，对于缩进四个空格和 ``` 后面没有指定语言的代码块，也会有高亮
      # 所以下面几行就是为了去除高亮
      if language.blank?
        language = 'text'
      end
      Pygments.highlight(code, lexer: language)
    end
  end

  def markdown(text)
    renderer = HTMLwithPygments.new(hard_wrap: true, filter_html: true)
    options = {
      autolink: true,
      no_intra_emphasis: true,
      fenced_code_blocks: true,
      lax_html_blocks: true,
      strikethrough: true,
      superscript: true
    }
    Redcarpet::Markdown.new(renderer, options).render(text).html_safe
  end

  def render_episode_publish_time(episode)
    I18n.l(episode.published_at.to_date, :format => :long)
  end
end
