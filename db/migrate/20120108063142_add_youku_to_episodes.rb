class AddYoukuToEpisodes < ActiveRecord::Migration
  def self.up
    add_column :episodes, :youku, :string
  end

  def self.down
    remove_column :episodes, :youku
  end
end
