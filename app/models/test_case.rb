# frozen_string_literal: true

class TestCase < ActiveRecord::Base
  include ApplicationHelper

  belongs_to :test_suite, inverse_of: :test_cases
  belongs_to :issue, inverse_of: :test_case
  has_many :execution_suite_test_case, class_name: "ExecutionSuiteTestCase"
  has_many :execution_suites, through: :execution_suite_test_case
  has_many :execution_journals, dependent: :destroy
  has_many :test_case_statuses, dependent: :destroy

  def self.for_project(project)
    TestCase.includes(:issue).where(project_id: project.id).to_a
  end

  # TODO: Move to view f.ex. using JBuilder
  #       (https://github.com/rails/jbuilder).
  def to_json
    result = {
      'id'               => id,
      'issue_id'         => issue_id,
      'issue'            => issue,
      'test_suite_id'    => test_suite_id,
      'subject'          => issue.subject,
      'preconditions'    => textilizable(preconditions),
      'steps'            => textilizable(steps),
      'expected_results' => textilizable(expected_results),
      'status'           => nil,
      'type'             => 'case'
    }
  end

  def journals(execution_suite_id)
    ExecutionJournal.where(
        test_case_id:       id,
        execution_suite_id: execution_suite_id
    )
  end
end
