require 'rails_helper'

feature 'View details of the goal for the current user' do
  let(:current_user) { FactoryGirl.create(:user) }

  before do
    login_user(current_user)
  end

  scenario 'When a user clicks on the goals name se goal details.' do
    goal = FactoryGirl.create(:goal, user: current_user)
    visit goals_path

    click_link(goal.name)

    expect(page).to have_content(goal.name)
    expect(page).to have_content(goal.description)
    expect(page).to have_content(goal.due_time.strftime('%a, %d %b %Y %H:%M:%S'))
    expect(page).to have_content(goal.amount_of_time_left_to_finish_goal)
  end
end
