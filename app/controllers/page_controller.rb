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
      client = Tinysou::Client.new Settings.tinysou.token
      results = client.search "happycasts", {
        q: params[:q], c: "episodes",
        sort: {
          field: "created_at",
          order: "desc",
          mode: "avg"
        }
      }
      @episodes = results[:records]
      @params = params[:q]
    end
  end
end
