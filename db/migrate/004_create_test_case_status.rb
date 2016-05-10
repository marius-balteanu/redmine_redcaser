class CreateTestCaseStatus < ActiveRecord::Migration
  def change
    create_table :test_case_statuses do |column|
      column.integer :execution_result_id
      column.integer :execution_suite_id
      column.integer :test_case_id
    end

    add_index :test_case_statuses, :execution_result_id
    add_index :test_case_statuses, :execution_suite_id
    add_index :test_case_statuses, :test_case_id
  end
end
