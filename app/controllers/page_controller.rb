class PageController < ApplicationController
  def welcome
    session[:return_to] = request.url
  end

  def stats
    @user_count = User.all.count
    @episode_count = Episode.all.count
    @comment_count = Comment.all.count
  end

  def search
    if params[:q]
      client = Swiftype::Client.new
      @results = client.search_document_type('hdsp', 'episodes', params[:q], {
        :search_fields => { 'episodes' => ['title^3', 'description', 'note'] }
      })

      @ep_results = @results['episodes']
    end
  end

  def testimonials
  end

  def courses
  end
end
