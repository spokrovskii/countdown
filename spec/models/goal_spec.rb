require 'rails_helper'

describe Goal, type: :model do
  it { should have_valid(:name).when('My Goal', 'Next') }
  it { should_not have_valid(:name).when('', nil) }

  it { should have_valid(:description).when('My description', 'describe') }
  it { should_not have_valid(:description).when('', nil) }

  it { should have_valid(:due_time).when('days') }


  describe 'display due-time' do
    it 'when user fils in due-time display it following format.' do
      goal = FactoryGirl.create(:goal, due_time:'Thu, 28 Jul 2016 23:00:00 UTC +00:00')

      expect(goal.due_time).to eq('2016-07-28 23:00:00.000000000 +0000')
    end
  end
end
