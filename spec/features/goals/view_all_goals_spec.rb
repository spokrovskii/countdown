require 'rails_helper'

feature 'View all goals' do
  scenario 'When user visits page see all goals.' do
    goals = FactoryGirl.create_list(:goal, 3)

    visit goals_path

    expect(page).to have_content('Goals')
    goals.each do |goal|
      expect(page).to have_content(goal.name)
    end
  end
end
