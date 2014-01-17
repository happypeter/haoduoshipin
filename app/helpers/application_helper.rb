require 'builder'
module ApplicationHelper
  def textilize(text)
    CodeFormatter.new(text).to_html.html_safe unless text.blank?
  end

  class HTMLwithPygments < Redcarpet::Render::HTML
    def block_code(code, language)
      languages = ["bash","ruby","python","c"]
      if !languages.include?language
        language = nil
      end
      sha = Digest::SHA1.hexdigest(code)
      Rails.cache.fetch ["code", language, sha].join('-') do
        Pygments.highlight(code, lexer: language)
      end
    end
  end

  def make_mention_links(text)
    mention_regexp = /@([a-zA-Z0-9_\-\p{han}]+)/u
    text = text.gsub(mention_regexp) do
      if $1.present?
        user = User.find_by_name($1)
        if user.present?
          "<a href='/users/#{user.id}'>@#{$1}</a>"
        else
          "@#{$1}"
        end
      else
        "@#{$1}"
      end
    end
    text.html_safe
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
    Redcarpet::Markdown.new(renderer, options).render(text)
  end

  def output_comment(text)
    make_mention_links(markdown text)
  end

  def render_user_register_time(user)
    I18n.l(user.created_at.to_date, :format => :long)
  end

  def render_episode_publish_time(episode)
    I18n.l(episode.published_at.to_date, :format => :long)
  end
end
