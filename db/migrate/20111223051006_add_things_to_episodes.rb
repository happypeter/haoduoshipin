class AddThingsToEpisodes < ActiveRecord::Migration
  def self.up
    add_column :episodes, :published_at, :datetime
    add_column :episodes, :seconds, :integer
    add_column :episodes, :description, :text
  end

  def self.down
    remove_column :episodes, :description
    remove_column :episodes, :seconds
    remove_column :episodes, :published_at
  end
end
