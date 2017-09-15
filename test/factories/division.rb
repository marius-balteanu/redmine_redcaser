FactoryGirl.define do
  factory :division do
    sequence(:name) {|count| "Sample Name #{ count }" }
  end
end
