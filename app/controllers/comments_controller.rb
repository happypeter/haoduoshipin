class CommentsController < ApplicationController

  def index
    @comments = Comment.recent.page(params[:page]).per_page(10)

    respond_to do |format|
      format.html
    end
  end

  def new
    @comment = Comment.new(:parent_id => params[:parent_id], :episode_id => params[:episode_id], :user => current_user)
  end

  def create
    @comment = current_user.comments.build(params[:comment])
    @comment.save
    respond_to do |format|
      format.html do
        if @comment.errors.present?
          render :new
        else
          redirect_to(episode_path(@comment.episode, :view => "comments"))
        end
      end
      format.js
    end
  end

  def edit
    @comment = Comment.find(params[:id])
  end

  def update
    @comment = Comment.find(params[:id])
    @comment.update_attributes(params[:comment])
    respond_to do |format|
      format.html do
        if @comment.errors.present?
          render :edit
        else
          redirect_to_target_or_default root_url
        end
      end
      format.js
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    respond_to do |format|
      format.html { redirect_to_target_or_default(root_url) }
      format.js
    end
  end

  def latest_comment
    @comment = Comment.recent.first
    info = {}
    info[:content] = @comment.content[0..40] << '...'
    info[:episode_id] = @comment.episode_id
    info[:episode_name] = Episode.find(@comment.episode_id).name
    info[:user] = User.find(@comment.user_id).name

    respond_to do |format|
      format.json {render :json => info}
    end
  end
end
