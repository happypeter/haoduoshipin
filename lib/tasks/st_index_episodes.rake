# encoding: utf-8
namespace :swiftype do
  desc "index data in the episodes table"
  task :index_episodes => :environment do
    client = Swiftype::Client.new

    Episode.find_in_batches(:batch_size => 120) do |episodes|
      documents = episodes.map do |e|
        url = "http://haoduoshipin.com/v/#{e.id}"
        {:external_id => e.id,
         :fields =>[{
            :name => 'title',
            :value => e.name,
            :type => 'string'
          }, {
            :name => 'description',
            :value => e.description,
            :type => 'text'
          }, {
            :name => 'created_at',
            :value => e.created_at.iso8601,
            :type => 'date'
          }, {
            :name => 'asset_name',
            :value => e.asset_name,
            :type => 'enum'
          }, {
            :name => 'note',
            :value => e.note,
            :type => 'text'
          }, {
            :name => 'url',
            :value => url,
            :type => 'enum'
          }, {
            :name => 'revision',
            :value => e.revision,
            :type => 'integer'
          }]
        }
      end

      results = client.create_or_update_documents('hdsp', 'episodes', documents)

      results.each_with_index do |result, index|
        puts "Could not create #{episodes[index].title} (##{episodes[index].id})" if result == false
      end
    end
  end
end
