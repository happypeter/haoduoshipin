# encoding: UTF-8
namespace :db do
  desc "set value for published column of table episodes"
  task :notification => :environment do
    Episode.all.each do |e|
      e.published = true
      e.save
    end
  end
end

