class EpisodesController < ApplicationController
  before_filter :check_admin, :except => [:all, :index, :show]
  def index
    @tag = Tag.find(params[:tag_id]) if params[:tag_id]
    if params[:search].blank?
      @episodes = (@tag ? @tag.episodes : Episode).recent.page(params[:page]).per_page(20)
    else
      @episodes = Episode.search do
        fulltext params[:search]
      end.results
      @count = @episodes.length
    end
    respond_to do |format|
      format.html
      format.rss
      format.json {render :json => @episodes}
    end
  end

  def all
    if params[:search].blank?
      @episodes = Episode.recent.page(params[:page]).per_page(12)
    else
      @episodes = Episode.search do
        fulltext params[:search]
      end.results
    end
    respond_to do |format|
      format.html
      format.js
    end
  end

  def show
    session[:return_to] = request.url
    @episode = Episode.find(params[:id])
    if @episode.commenters.include?(current_user)
      current_user.notifications.where(unread: true).each do |n|
        if n.comment.episode_id == @episode.id
          n.update_attributes!(unread: false)
        end
      end
    end
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
