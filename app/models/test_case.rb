# frozen_string_literal: true

class TestCase < ActiveRecord::Base
  unloadable
  include ApplicationHelper

  belongs_to :test_suite, inverse_of: :test_cases
  belongs_to :issue, inverse_of: :test_case

  has_many :execution_suite_test_case, class_name: "ExecutionSuiteTestCase"
  has_many :execution_suites, through: :execution_suite_test_case
  has_many :execution_journals, dependent: :destroy
  has_many :test_case_statuses, dependent: :destroy

  validates_presence_of :test_suite_id

  # TODO: Move to view f.ex. using JBuilder
  #       (https://github.com/rails/jbuilder).
  def to_json
    result = {
      'id'               => id,
      'issue_id'         => issue_id,
      'test_suite_id'    => test_suite_id,
      'subject'          => issue.subject,
      'preconditions'    => textilizable(preconditions),
      'steps'            => textilizable(steps),
      'expected_results' => textilizable(expected_results),
    }
  end

  def journals(execution_suite_id)
    ExecutionJournal.where(
        test_case_id:       id,
        execution_suite_id: execution_suite_id
    )
  end
end
