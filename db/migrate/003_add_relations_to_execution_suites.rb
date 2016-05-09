# frozen_string_literal: true

class AddRelationsToExecutionSuites < ActiveRecord::Migration
  def change
    add_column :execution_suites, :environment_id, :integer
    add_column :execution_suites, :query_id,       :integer
    add_column :execution_suites, :version_id,     :integer

    add_index  :execution_suites, :environment_id
    add_index  :execution_suites, :query_id
    add_index  :execution_suites, :version_id
  end
end
