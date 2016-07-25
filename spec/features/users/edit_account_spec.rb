require 'rails_helper'

feature 'User makes changes to account', %{
  As a user
  I want to edit my account information
  So that I can make updates to my account if my information changes
}, :devise do
  scenario 'can change email' do
    user = FactoryGirl.create(:user)
    login_user(user)
    visit root_path
    click_link user.email
    fill_in 'Email', with: 'newemail@test.com'
    fill_in 'Current password', with: user.password
    click_button 'Update'

    expect(page).to have_content I18n.t 'devise.registrations.updated'
    click_link 'newemail@test.com'
    expect(page).to have_field('Email', with:  'newemail@test.com')
  end

  scenario 'can not enter email that is already taken' do
    user1 = FactoryGirl.create(:user)
    user2 = FactoryGirl.create(:user)
    visit root_path
    login_user(user1)
    click_link user1.email
    fill_in 'Email', with: user2.email
    fill_in 'Current password', with: user1.password
    click_button 'Update'

    expect(page).to have_content 'Email has already been taken'
  end
end
