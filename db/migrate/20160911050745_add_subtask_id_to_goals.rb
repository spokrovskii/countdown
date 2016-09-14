class AddSubtaskIdToGoals < ActiveRecord::Migration
  def change
    add_column :goals, :subtask_id, :integer
  end
end
