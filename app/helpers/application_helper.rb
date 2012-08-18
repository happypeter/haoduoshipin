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

  def avatar_url(user)
    default_url = "#{root_url}assets/cat.png"
    gravatar_id = Digest::MD5.hexdigest(user.email.try(:downcase).to_s) # some github user has NULL email
    "http://gravatar.com/avatar/#{gravatar_id}.png?s=512&d=#{CGI.escape(default_url)}"
  end

  def render_user_register_time(user)
    I18n.l(user.created_at.to_date, :format => :long)
  end
  def render_episode_publish_time(episode)
    I18n.l(episode.published_at.to_date, :format => :long)
  end
end
