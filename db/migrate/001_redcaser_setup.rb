class RedcaserSetup < ActiveRecord::Migration
  def change
    create_table :test_suites do |column|
      column.string  :name, null: false, limit: 128
      column.integer :parent_id, default: nil
      column.integer :project_id
    end
    add_index :test_suites, [:name, :parent_id], unique: true

    create_table :execution_suites do |column|
      column.string  :name, null: false, limit: 128
      column.integer :project_id
      column.integer :environment_id
      column.integer :query_id
      column.integer :version_id
    end
    add_index :execution_suites, :version_id

    create_table :test_cases do |column|
      column.integer :test_suite_id, null: false
      column.integer :issue_id, null: false
      column.text :test_cases, :preconditions
      column.text :test_cases, :steps
      column.text :test_cases, :expected_results
    end
    add_index :test_cases, [:test_suite_id, :issue_id], unique: true,
      name: 'test_suite_test_case_index'

    create_table :execution_suite_test_case, id: false do |column|
      column.integer :execution_suite_id, null: false
      column.integer :test_case_id, null: false
    end
    add_index :execution_suite_test_case, [:execution_suite_id, :test_case_id],
      unique: true, name: 'execution_suite_test_case_index'

    create_table :execution_results do |column|
      column.string  :name, null: false
      column.integer :order_number, unique: true
    end
    add_index :execution_results, [:name], unique: true

    create_table :execution_journals do |column|
      column.integer  :test_case_id, null: false
      column.integer  :result_id, null: false
      column.integer  :execution_suite_id
      column.integer  :executor_id, null: true
      column.text     :comment
      column.datetime :created_on, null: false
    end
    add_index :execution_journals, :execution_suite_id

    create_table :execution_environments do |column|
      column.string  :name, null: false, limit: 128
      column.string  :description
      column.integer :project_id, null: false
    end

    create_table :test_case_statuses do |column|
      column.integer :execution_result_id
      column.integer :execution_suite_id
      column.integer :test_case_id
    end
    add_index :test_case_statuses, :execution_suite_id
    add_index :test_case_statuses, :test_case_id

  end
end
