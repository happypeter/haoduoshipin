# encoding: UTF-8
namespace :db do
  desc "analyze table notifications"
  task :notification => :environment do
    Notification.all.each do |n|
      if n.comment == nil
        n.delete
      end
    end
  end
end

