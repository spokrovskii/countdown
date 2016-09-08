class AddSubtaskToGoals < ActiveRecord::Migration
  def change
    add_column :goals, :subtask, :string
  end
end
