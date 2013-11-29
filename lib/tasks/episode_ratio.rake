# encoding: UTF-8

namespace :db do
  desc "setup ratio column of episodes table"
  task :episode_ratio => :environment do
    Episode.all.each do |e|
      if e.ratio == nil
        e.ratio = 4.0/3.0
      end
      e.save!
    end
  end
end
