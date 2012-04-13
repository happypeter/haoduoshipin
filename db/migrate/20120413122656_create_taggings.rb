class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.belongs_to :episode
      t.belongs_to :tag
      t.timestamps
    end
  end
end
