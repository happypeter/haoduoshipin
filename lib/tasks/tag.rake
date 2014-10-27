# encoding: UTF-8
namespace :db do
  desc "fill up the ep_count column of tags table"
  task :tags => :environment do
    Tag.all.each do |t|
      t.ep_count = t.episodes.count
      t.save
    end
  end
end
