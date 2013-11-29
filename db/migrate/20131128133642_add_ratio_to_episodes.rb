class AddRatioToEpisodes < ActiveRecord::Migration
  def change
    add_column :episodes, :ratio, :float
  end
end
