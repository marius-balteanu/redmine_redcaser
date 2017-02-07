class TestCaseStatus < ActiveRecord::Base
  belongs_to :execution_result
  belongs_to :execution_suite
  belongs_to :test_case

  validates :test_case, uniqueness: {scope: [:execution_result, :execution_suite]}

  def to_json
    {
      id:           id,
      name:         execution_result.name,
      status_id:    execution_result_id,
      test_case_id: test_case_id
    }
  end
end
