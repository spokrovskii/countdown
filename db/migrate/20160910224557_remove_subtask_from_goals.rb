class RemoveSubtaskFromGoals < ActiveRecord::Migration
  def change
    remove_column :goals, :subtask, :string
  end
end
