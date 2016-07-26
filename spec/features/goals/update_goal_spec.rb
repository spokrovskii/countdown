require 'rails_helper'

feature 'Edit a goal', %{
  As a user
  I want to edit my own goal
  So that I can make updates if details about my goal change
} do
  let(:user) { FactoryGirl.create(:user) }
  let(:goal) { FactoryGirl.create(:goal) }

  before do
    login_user(user)
    visit edit_goal_path(goal)
  end

  scenario 'User edits form correctly' do
    fill_in('Name', with: 'Updated Name!')
    fill_in('Description', with: 'New description')

    click_button('Save Goal')

    expect(page).to have_content('Updated Name!')
    expect(page).to have_content('New description')

    expect(page).to have_content('Goal saved successfully')
  end

  scenario 'User submits blank form' do
    fill_in('Name', with: '')
    fill_in('Description', with: '')

    click_button('Save Goal')

    expect(page).to have_content('Problems updating goal')
    expect(page).to have_content("Name can't be blank")
    expect(page).to have_content("Description can't be blank")
  end

  scenario 'unauthenticated user cannot edit a goal' do
    logout

    visit edit_goal_path(goal)

    expect(page).to have_content('You need to sign in or sign up before '\
                                 'continuing')
    expect(current_path).to eq(new_user_session_path)
  end
end
