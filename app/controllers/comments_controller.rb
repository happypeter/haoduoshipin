class CommentsController < ApplicationController
  def index
    @comments = Comment.recent.page(params[:page]).per_page(30)
  end

  def new
    @comment = Comment.new(:parent_id => params[:parent_id], :episode_id => params[:episode_id], :user => current_user)
  end

  def create
    @comment = Comment.new(params[:comment])
    @comment.save
    respond_to do |format|
      format.html { redirect_to @comment.commentable }
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
end
