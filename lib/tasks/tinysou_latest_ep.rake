# encoding: utf-8
namespace :tinysou do
  desc "export the latest published episode to tinysou"
  task :latest => :environment do
    client = Tinysou::Client.new ENV["TINYSOU_AUTH_TOKEN"]

    e = Episode.where(published: true).last
    client.create_document "happycasts", "episodes", {
      eid: e.id,
      name: e.name,
      desc: e.description,
      tags: e.tag_names,
      published_at: e.created_at,
      asset_name: e.asset_name,
      revision: e.revision
    }
  end
end
