class PageController < ApplicationController
  def welcome
  end

  def stats
    @usercount = User.all.count
  end
end
