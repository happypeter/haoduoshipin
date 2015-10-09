# encoding: UTF-8
namespace :db do
  desc "export episode's comment to json"
  task :ep_comments => :environment do
    items = []
    Comment.where(commentable_type: "Episode").each do |c|
      meta = {}
      meta['episodeId'] = c.commentable_id
      meta['content'] = c.content
      meta['commenter'] = c.user.name
      meta['email'] = c.user.email
      meta['createdAt'] = 'ISODate(' + c.created_at.iso8601 + ')'
      items << meta.to_json
    end

    File.open("comments.json", 'w') do |f|
      items = items.join("\n").gsub(/\"ISODate\((.*?)\)\"/, 'ISODate("\1")')
      f.write(items)
    end
  end
end

