# frozen_string_literal: true

class TestCase < ActiveRecord::Base
  belongs_to :test_suite
  belongs_to :issue
  has_and_belongs_to_many(
    :execution_suites,
    join_table: 'execution_suite_test_case'
  )
  has_many :execution_journals, dependent: :destroy
  attr_protected :id

  # TODO: Move to view f.ex. using JBuilder
  #       (https://github.com/rails/jbuilder).
  def to_json(version = nil, environment = nil)
    atext = "##{issue_id} - #{issue.subject}"
    last_result = get_last_result(version, environment)

    {
      'id'               => id,
      'issue_id'         => issue_id,
      'test_suite_id'    => test_suite_id,
      'name'             => atext,
      'preconditions'    => preconditions,
      'steps'            => steps,
      'expected_results' => expected_results,
      'status'           => nil,
      'type'             => 'case',
      'state'            => {
        'disabled' => (issue.status.id != RedcaserSettings.status_active_id)
      }
    }
  end

  def remove_from_execution_suite(suite_id)
    execution_suite = ExecutionSuite.find(suite_id)
    execution_suite.test_cases.delete(self)
  end

  def change_execution_suite?(source_id, dest_id)
    destination_suite = ExecutionSuite.find(dest_id)
    source_suite = ExecutionSuite.find(source_id)
    if (source_suite.root == destination_suite.root) or (destination_suite.is_test_case_id_unique?(id))
      destination_suite.test_cases << self
      source_suite.test_cases.delete(self)
      true
    else
      false
    end
  end

  def add_to_execution_suite?(dest_id)
    execution_suite = ExecutionSuite.find(dest_id)
    if execution_suite.is_test_case_id_unique?(id)
      execution_suite.test_cases << self
      true
    else
      false
    end
  end

  private

  def get_last_result(version = nil, environment = nil)
    if execution_journals.any?
      if version.nil? || environment.nil?
        execution_journals.last.result.name.gsub(' ', '')
      else
        last_result = execution_journals.where({
            version: version, environment: environment
          }).last
        if last_result.nil?
          'none'
        else
          last_result.result.name.gsub(' ', '')
        end
      end
    else
      'none'
    end
  end
end
