class AddPositionToEpisodes < ActiveRecord::Migration
  def self.up
    add_column :episodes, :position, :integer
  end

  def self.down
    remove_column :episodes, :position
  end
end
