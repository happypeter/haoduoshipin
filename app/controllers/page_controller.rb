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
      @episodes = nil
      @params = params[:q]
    end
  end

  def testimonials
  end
end
