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
        c: "episodes",
        q: '"' + params[:q] + '"',
        search_fields: ["name", "desc", "tags"],
        sort: {
          field: "published_at",
          order: "desc",
          mode: "avg"
        }
      }
      @episodes = results[:records]
      @params = params[:q]
    end
  end

  def testimonials
  end
end
