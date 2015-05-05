# encoding: utf-8
namespace :tinysou do
  desc "export data from the episodes table to tinysou"
  task :episodes => :environment do
    client = Tinysou::Client.new ENV["TINYSOU_AUTH_TOKEN"]
    client.destroy_engine "happycasts"
    if client.engines.empty?
      client.create_engine name: "happycasts", display_name: "happycasts.net"
      client.create_collection "happycasts", name: "episodes", field_types: {
        eid: "integer",
        name: "string",
        desc: "text",
        tags: "string",
        published_at: "date",
        asset_name: "string",
        revision: "integer"
      }
    end

    Episode.where(published: true).each do |e|
      client.create_document "haoduoshipin", "episodes", {
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
end
