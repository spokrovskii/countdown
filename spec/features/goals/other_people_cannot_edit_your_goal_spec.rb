require 'rails_helper'

feature 'users cannot edit goals they did not create', %{
  As a user
  I can't edit other users' goals
  So that I don't mess up other users's submission
} do
  # ACCEPTANCE CRITERIA
  # [X] User cannot edit another user's goal
  # [ ] User cannot delete another user's goal

  let(:current_user) { FactoryGirl.create(:user) }
  let(:another_user) { FactoryGirl.create(:user) }
  let(:goal) { FactoryGirl.create(:goal, user: another_user) }

  before do
    login_user(current_user)
    visit goal_path(goal)
  end
  scenario 'user tries to edit a goal of another user' do
    expect(page).not_to have_button('Edit')
  end

  scenario 'user tries to visit the edit page for another user goal' do
    visit edit_goal_path(goal)
    expect(page).to have_content('You do not have permission to complete '\
                                 'that action.')
    expect(current_path).to eq(root_path)
  end

  scenario 'user tries to delete goal of another user' do
    expect(page).not_to have_button('Delete')
  end
end
