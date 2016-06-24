class RemoveExecutionJournalColumns < ActiveRecord::Migration
  def up
    remove_column :execution_journals, :version_id
    remove_column :execution_journals, :environment_id

    add_column :execution_journals, :execution_suite_id, :integer
    add_index :execution_journals, :execution_suite_id
  end

  def down
    remove_column :execution_journals, :execution_suite_id

    add_column :execution_journals, :version_id, :integer
    add_column :execution_journals, :environment_id, :integer
  end
end
