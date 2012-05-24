class RemovePositionFromEpisode < ActiveRecord::Migration
  def up
    remove_column :episodes, :position
  end

  def down
    add_column :episodes, :position, :integer
  end
end
