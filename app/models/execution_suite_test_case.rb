# frozen_string_literal: true

class ExecutionSuiteTestCase < ActiveRecord::Base
  self.table_name = 'execution_suite_test_case'

  belongs_to :execution_suite
  belongs_to :test_case
end
