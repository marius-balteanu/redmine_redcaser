class AddProjectToTestCases < ActiveRecord::Migration
  def change
    add_reference :test_cases, :project, index: true
  end
end
