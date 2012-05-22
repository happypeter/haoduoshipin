class CodeFormatter
  def initialize(text)
    @text = text
  end

  def to_html
    text = @text.clone
    codes = []
    text.gsub!(/^``` ?(.*?)\r?\n(.+?)\r?\n```\r?$/m) do |match|
      code = { :id => "CODE#{codes.size}ENDCODE", :name => ($1.empty? ? nil : $1), :content => $2 }
      codes << code
      "\n\n#{code[:id]}\n\n"
    end

    renderer = Redcarpet::Render::HTML.new(hard_wrap: true, filter_html: true)
    options = {
      autolink: true,
      no_intra_emphasis: true,
      fenced_code_blocks: true,
      lax_html_blocks: true,
      strikethrough: true,
      superscript: true
    }
    html = Redcarpet::Markdown.new(renderer, options).render(text)

    codes.each do |code|
      html.sub!("<p>#{code[:id]}</p>") do
        <<-EOS
          <div class="code_block">
            <div class="code_header">
              <span class="filename">
                <i class="icon-file"></i>
                #{CGI.escapeHTML(code[:name].to_s)}
              </span>
            </div>
            #{Pygments.highlight(code[:content], lexer: language(code[:name]))}
          </div>
        EOS
      end
    end
    html
  end

  def language(path)
    case path
    when /\.yml$/ then "yaml"
    when /\.c$/,/\.h$/  then "c"
    when /\.js$/ then "java_script"
    when /\.scss$/ then "css"
    when /\.erb$/, /\.html$/ then "rhtml"
    when /\.rb$/, /\.rake$/, /\.gemspec/, /file$/, /console$/ then "ruby"
    when /\./ then path[/\.([^.]+?)$/, 1]
    else nil
    end
  end
end
