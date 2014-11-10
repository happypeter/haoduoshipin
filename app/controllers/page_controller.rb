class PageController < ApplicationController
  def welcome
    session[:return_to] = request.url
  end

  def stats
    @user_count = User.all.count
    @episode_count = Episode.all.count
    @comment_count = Comment.all.count
  end
end
