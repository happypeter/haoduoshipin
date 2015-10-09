# encoding: UTF-8
namespace :db do
  desc "export episode data to json"
  task :epmeta => :environment do
    items = []
    Episode.all.each do |e|
      meta = {}
      meta['id'] = e.id
      meta['name'] = e.name
      meta['title'] = e.title
      meta['description'] = e.description
      meta['ratio'] = e.ratio
      meta['baidu'] = e.baidu
      meta['revision'] = e.revision
      meta['createdAt'] = 'ISODate(' + e.created_at.iso8601 + ')'
      meta['updatedAt'] = 'ISODate(' + e.updated_at.iso8601 + ')'
      items << meta.to_json
    end

    File.open("epmeta.json", 'w') do |f|
      items = items.join("\n").gsub(/\"ISODate\((.*?)\)\"/, 'ISODate("\1")')
      f.write(items)
    end
  end
end

