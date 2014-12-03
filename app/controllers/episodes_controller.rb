class EpisodesController < ApplicationController
   before_action :check_admin, :only => [:new, :create, :edit, :update]

  def index
    @tag = Tag.find(params[:tag_id]) if params[:tag_id]
    @episodes = (@tag ? @tag.episodes : Episode).recent.page(params[:page]).per_page(20)
    respond_to do |format|
      format.html { redirect_to root_path }
      format.rss
    end
  end

  def all
    @episodes = Episode.recent
  end

  def tags
    @tags = Tag.all.sort_by{ |t| t.name.downcase }
  end

  def tag
    if Tag.find_by_name(params[:tag])
      @episodes = Tag.find_by(name: params[:tag]).episodes.sort_by{ |e| e.published_at }.reverse
    end
  end

  def show
    session[:return_to] = request.url
    @episode = Episode.find(params[:id])
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

  def add_heart
    @episode = Episode.find(params[:id])
    @episode.hearts << current_user unless @episode.hearts.include? current_user

    render json: { episode_hearts: @episode.hearts.count }
  end
end
