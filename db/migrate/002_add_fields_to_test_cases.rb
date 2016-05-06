class AddFieldsToTestCases < ActiveRecord::Migration
  def change
    add_column :test_cases, :preconditions,    :text
    add_column :test_cases, :steps,            :text
    add_column :test_cases, :expected_results, :text
  end
end
