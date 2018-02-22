class Goal < ActiveRecord::Base
  belongs_to :user
  has_many :subtasks, dependent: :destroy
  validates :name, presence: true
  validates :description, presence: true
  accepts_nested_attributes_for :subtasks

  def amount_of_time_left_to_finish_goal
    time = Time.now
    diff = due_time - time
    days = diff / 60 / 60 / 24
    days_number = days.floor
    hours_fraction = (days - days.floor)
    hours = hours_fraction * 24
    hours_number = hours.floor
    minutes_fraction = (hours - hours_number)
    minutes = minutes_fraction * 60
    minutes_number = minutes.floor
    seconds_fraction = (minutes - minutes_number)
    seconds = seconds_fraction * 60
    seconds_number = seconds.floor
    time_left = days_number.to_s + ' day(s) ' +
        hours_number.to_s + ' hour(s) ' +
        minutes_number.to_s + ' minute(s) ' +
        seconds_number.to_s + ' seconds'
    # if days_number <1
    #   @time_left = "it should be done by now"
    # elsif days_number == 1
    #   @time_left = days_number.to_s + ' day left to finish '
    # else
    #   @time_left = days_number.to_s + ' days left to finish '
    # end
  end
end
