class ExecutionJournal < ActiveRecord::Base
  belongs_to :test_case
  belongs_to :version
  belongs_to :result, class_name: 'ExecutionResult'
  belongs_to :executor, class_name: 'User'
  belongs_to :environment, class_name: 'ExecutionEnvironment'
  attr_protected :id

  def self.find_by_issue_id(issue_id)
    test_case = TestCase.find_by_issue_id(issue_id)
    ExecutionJournal
      .order('created_on desc')
      .where({test_case_id: test_case.id})
  end
end
