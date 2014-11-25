class CreateHeartings < ActiveRecord::Migration
  def change
    create_table :heartings do |t|
      t.integer :hearted_episode_id
      t.integer :heart_id

      t.timestamps
    end
  end
end
