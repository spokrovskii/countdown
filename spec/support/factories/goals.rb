FactoryGirl.define do
  factory :goal do
    sequence(:name) { |number| "Goal #{number}" }
    description "description of my goal is here"
    created_at Time.now
    due_time Time.now
    user_id 123
  end
end
