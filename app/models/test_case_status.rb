class TestCaseStatus < ActiveRecord::Base
  belongs_to :execution_result
  belongs_to :execution_suite
  belongs_to :test_case

  def to_json
    {
      id:           id,
      name:         execution_result.name,
      status_id:    execution_result_id,
      test_case_id: test_case_id
    }
  end
end
