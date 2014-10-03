class RemoveNameAndEmailAndAncestryFromComments < ActiveRecord::Migration
  def change
    remove_column :comments, :name
    remove_column :comments, :email
    remove_column :comments, :ancestry
  end
end
