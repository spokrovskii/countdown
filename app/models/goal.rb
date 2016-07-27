class Goal < ActiveRecord::Base
  belongs_to :user
  validates :name, presence: true
  validates :description, presence: true

  def amount_of_time_left_to_finish_goal
    time_finished = due_time
    time_started = Time.now
    diff = time_finished - time_started
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
      days_number.to_s + ' day(s) ' +
      hours_number.to_s + ' hour(s) ' +
      minutes_number.to_s + ' minute(s) ' +
      seconds_number.to_s + ' seconds'
  end
end
