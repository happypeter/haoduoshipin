class AddBaiduToEpisodes < ActiveRecord::Migration
  def change
    add_column :episodes, :baidu, :string
  end
end
