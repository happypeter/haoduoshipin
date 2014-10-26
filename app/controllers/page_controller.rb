class PageController < ApplicationController
  def welcome
    session[:return_to] = request.url
  end

  def stats
    @usercount = User.all.count
  end
end
