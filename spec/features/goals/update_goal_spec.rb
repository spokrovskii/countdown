require 'rails_helper'

feature 'Edit a goal', %{
  As a user
  I want to edit my own goal
  So that I can make updates if details about my goal change
} do
  let(:current_user) { FactoryGirl.create(:user) }
  let(:goal) { FactoryGirl.create(:goal, user: current_user) }

  before do
    login_user(current_user)
    visit edit_goal_path(goal)
  end

  scenario 'User edits form correctly' do
    fill_in('Name', with: 'Updated Name!')
    fill_in('Description', with: 'New description')
    select '2017', from: 'goal[due_time(1i)]'
    select 'June', from: 'goal[due_time(2i)]'
    select '20', from: 'goal[due_time(3i)]'

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
