class ExecutionJournal < ActiveRecord::Base
  include ApplicationHelper

  belongs_to :test_case
  belongs_to :result, class_name: 'ExecutionResult'
  belongs_to :executor, class_name: 'User'
  attr_protected :id

  def self.find_by_issue_id(issue_id)
    test_case = TestCase.find_by_issue_id(issue_id)
    ExecutionJournal
      .order('created_on desc')
      .where({test_case_id: test_case.id})
  end

  def as_json(options={})
  {
    'id'        => id,
    'result_id' => result.name,
    'author'    => executor,
    'comment'   => textilizable(comment)
  }
  end
end
