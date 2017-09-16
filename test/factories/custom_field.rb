FactoryGirl.define do
  factory :custom_field do
    sequence(:name) {|count| "Sample Name #{ count }" }
    sequence :position
    is_for_all true
    editable true
    field_format 'int'

    trait :issue do
      type 'IssueCustomField'
    end

    trait :user do
      type 'UserCustomField'
    end
  end
end
