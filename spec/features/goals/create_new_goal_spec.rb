require 'rails_helper'

feature 'Create a goal', %{
  As a user
  I want to create a goal
  So that I can add my goal on a page
} do
  let(:user) { FactoryGirl.create(:user) }
  let(:goal) { FactoryGirl.build(:goal) }

  before do
    login_user(user)
    visit new_goal_path
  end

  scenario 'User fills out form correctly' do
    fill_in('Name', with: goal['name'])
    fill_in('Description', with: goal['description'])
    fill_in('Created at', with: goal['created_at'])
    fill_in('Due time', with: goal['due_time'])

    click_button('Save Goal')

    expect(page).to have_content(goal['name'])
    expect(page).to have_content(goal['description'])
    expect(page).to have_content(goal['created_at'])
    expect(page).to have_content(goal['due_time'])

    expect(page).to have_content('Goal saved successfully')
  end

  scenario 'User submits blank form' do
    click_button('Save Goal')

    expect(page).to have_content('Problems saving goal')
    expect(page).to have_content("Name can't be blank")
    expect(page).to have_content("Description can't be blank")
  end

  scenario 'an unauthenticated user cannot create a goal' do
    logout

    visit new_goal_path

    expect(page).to have_content('You need to sign in or sign up before '\
                                 'continuing')
    expect(current_path).to eq(new_user_session_path)
  end
end
