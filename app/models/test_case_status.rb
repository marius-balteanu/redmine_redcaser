class TestCaseStatus < ActiveRecord::Base
  belongs_to :execution_result
  belongs_to :execution_suite
  belongs_to :test_case
end
