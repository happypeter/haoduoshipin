class AddNotesToEpisodes < ActiveRecord::Migration
  def self.up
    add_column :episodes, :notes, :text
  end

  def self.down
    remove_column :episodes, :notes
  end
end
