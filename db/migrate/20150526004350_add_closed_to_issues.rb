class AddClosedToIssues < ActiveRecord::Migration
  def change
    add_column :issues, :closed, :boolean, default: false
  end
end
