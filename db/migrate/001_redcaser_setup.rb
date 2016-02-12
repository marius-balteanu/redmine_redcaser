class RedcaserSetup < ActiveRecord::Migration
  def up
    create_table :test_suites do |column|
      column.string  :name, null: false, limit: 128
      column.integer :parent_id, default: nil
      column.integer :project_id
    end
    add_index :test_suites, [:name, :parent_id], unique: true

    create_table :execution_suites do |column|
      column.string  :name, null: false, limit: 128
      column.integer :parent_id, default: nil
      column.integer :project_id
    end
    add_index :execution_suites, [:name, :parent_id], unique: true

    create_table :test_cases do |column|
      column.integer :test_suite_id, null: false
      column.integer :issue_id, null: false
    end
    add_index :test_cases, [:test_suite_id, :issue_id], unique: true

    create_table :execution_suite_test_case, id: false do |column|
      column.integer :execution_suite_id, null: false
      column.integer :test_case_id, null: false
    end
    add_index :execution_suite_test_case, [:execution_suite_id, :test_case_id], unique: true

    create_table :execution_results do |column|
      column.string  :name, null: false
      column.integer :order_number, unique: true
    end
    add_index :execution_results, [:name], unique: true

    create_table :execution_journals do |column|
      column.integer  :test_case_id, null: false
      column.integer  :result_id, null: false
      column.integer  :version_id
      column.integer  :executor_id, null: true
      column.integer  :environment_id
      column.text     :comment
      column.datetime :created_on, null: false
    end

    create_table :execution_environments do |column|
      column.string  :name, null: false, limit: 128
      column.string  :description
      column.integer :project_id, null: false
    end
  end
end
