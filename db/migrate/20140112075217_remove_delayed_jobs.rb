class RemoveDelayedJobs < ActiveRecord::Migration
  def up
    drop_table :delayed_jobs
  end

  def down
  end
end
