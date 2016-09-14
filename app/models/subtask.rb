class Subtask < ActiveRecord::Base
  belongs_to :goal
  belongs_to :user

  def can_modify?(item)
    id == item.user_id
  end
end
