class EpisodesController < ApplicationController
  def index
    @tag = Tag.find(params[:tag_id]) if params[:tag_id]
    if params[:search].blank?
      @episodes = (@tag ? @tag.episodes : Episode).recent.page(params[:page]).per_page(20)
    else
      @episodes = Episode.search_published(params[:search], params[:tag_id])
    end
    respond_to do |format|
      format.html
      format.rss
    end
  end

  def show
    session[:return_to] = request.url
    @episode = Episode.find(params[:id])
    @comment = Comment.new(:episode => @episode, :user => current_user)
    respond_to do |f|
      f.html
      f.json {render :json => @episode}
    end
  end

  def new
    @episode = Episode.new
    @default_time = Episode.last.nil? ? Time.now : Episode.last.published_at + 7.days
  end

  def create
    @episode = Episode.new(params[:episode])
    if @episode.save
      redirect_to @episode, :notice => "Successfully created episode."
    else
      render :new
    end
  end

  def edit
    @episode = Episode.find(params[:id]) 
  end

  def update
    @episode = Episode.find(params[:id])
    if @episode.update_attributes(params[:episode])
      redirect_to @episode, :notice => "Successfully updated episode."
    else
      render :edit
    end
  end
end
