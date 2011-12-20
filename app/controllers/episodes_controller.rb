class EpisodesController < ApplicationController
  def index
    @episodes = Episode.all
    respond_to do |format|
      format.html { @episodes = @episodes.paginate(:page => params[:page], :per_page => episodes_per_page) }
      format.rss
    end
  end

  def show
  end

  def new
  end

  def create
    if @episode.save
      redirect_to @episode, :notice => "Successfully created episode."
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @episode.update_attributes(params[:episode])
      redirect_to @episode, :notice => "Successfully updated episode."
    else
      render :edit
    end
  end

