# encoding: UTF-8
namespace :db do
  desc "get episode notes"
  task :shownote => :environment do
    Episode.all.each do |e|
      File.open("note/#{e.id}.md", 'w') do |f|
        f.write(e.note)
      end
    end
  end
end

