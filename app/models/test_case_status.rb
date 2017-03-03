class TestCaseStatus < ActiveRecord::Base
  belongs_to :execution_result
  belongs_to :execution_suite
  belongs_to :test_case

  validates_uniqueness_of :execution_result, scope: [:test_case_id, :execution_suite_id]

  def to_json
    {
      id:           id,
      name:         execution_result.name,
      status_id:    execution_result_id,
      test_case_id: test_case_id
    }
  end
end
