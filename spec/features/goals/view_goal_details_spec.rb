require 'rails_helper'

feature 'View details of the goal' do
  let!(:goal) { FactoryGirl.create(:goal) }

  scenario 'When a user clicks on the goals name se goal details.' do
    visit goals_path

    click_link(goal.name)

    expect(page).to have_content(goal.name)
  end

  scenario 'When user visits page should see goals details' do
    visit goal_path(goal)

    expect(page).to have_content(goal.name)
    expect(page).to have_content(goal.description)
  end
end
