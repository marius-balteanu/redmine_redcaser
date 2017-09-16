# Redmine does not have a model for the custom_fields_trackers table
puts "warning: CustomFieldsRole model created in #{ __FILE__ }"
puts 'warning: This must be removed when redmine will add it to the core!'

class CustomFieldsRole < ActiveRecord::Base
end

FactoryGirl.define do
  factory :custom_fields_role do
  end
end
