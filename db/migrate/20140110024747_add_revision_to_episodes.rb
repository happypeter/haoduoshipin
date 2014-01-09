class AddRevisionToEpisodes < ActiveRecord::Migration
  def change
    add_column :episodes, :revision, :integer
  end
end
