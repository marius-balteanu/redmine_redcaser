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

  def copy_to(project)
    new_issue = Issue.new
    new_issue.copy_from(issue, subtasks: false)
    new_issue.project = project
    # Changing project resets the custom field values.
    new_issue.custom_field_values = issue.custom_field_values
      .inject({}) { |h, v|
        h[v.custom_field_id] = v.value
        h
      }
    # Reassign fixed_versions by name, since names are unique per project.
    if issue.fixed_version && (issue.fixed_version.project == project)
      new_issue.fixed_version = self.versions.detect { |v|
        v.name == issue.fixed_version.name
      }
    end
    # Reassign the category by name, since names are unique per project.
    if issue.category
      new_issue.category = self.issue_categories.detect { |c|
        c.name == issue.category.name
      }
    end
    new_issue.save
  end

  def in_suite?(suite_id, project_id)
    # Is the test case directly in the suite?
    included = execution_suites.any? { |es|
      (es.id == suite_id) && (!es.project.nil? && (es.project.id == project_id))
    }
    if !included
      # Apparently nested suites don't have a project so we don't filter
      # by that here.
      other_suites = execution_suites.select { |es| !es.parent.nil? }
      while other_suites.any?
        if other_suites.any? { |es| (es.parent.id == suite_id) }
          included = true
          break
        else
          other_suites
            .collect! { |es| es.parent }
            .select! { |es| !es.parent.nil? }
          other_suites.compact!
        end
      end
    end
    included
  end

  # TODO: Move to view f.ex. using JBuilder
  #       (https://github.com/rails/jbuilder).
  def to_json(version = nil, environment = nil)
    atext = "##{issue_id} - #{issue.subject}"
    last_result = get_last_result(version, environment)

    {
      'id'        => id,
      'issue_id'  => issue_id,
      'text'      => atext,
      'editable'  => false,
      'leaf'      => true,
      'status'    => issue.status,
      'draggable' => true,
      'type'      => 'case',
      'state'     => {
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
