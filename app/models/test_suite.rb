# frozen_string_literal: true

class TestSuite < ActiveRecord::Base
  acts_as_tree order: 'name'
  has_many :test_cases, dependent: :destroy
  belongs_to :project
  attr_protected :id

  def self.for_project(project)
    TestSuite
      .includes({test_cases: [:execution_suites, {issue: [:author, :status]}]}, :children)
      .where(project_id: project.id, parent_id: nil)
      .to_a
  end

  def has_children?
    TestSuite.where(parent_id: id).exists?
  end

  def has_cases?
    TestCase.where(test_suite_id: id).exists?
  end

  # TODO: Move to view f.ex. using JBuilder
  #       (https://github.com/rails/jbuilder).
  def to_json
    if parent_id
      kids = children.includes({test_cases: [:execution_suites, issue: [:author, :status]]}, :children)
          .map { |s| s.to_json } \
        + test_cases
          .sort_by { |x| x.issue.subject }
          .map { |tc| tc.to_json }
    else
      kids = children.includes({test_cases: [:execution_suites, issue: [:author, :status]]}, :children)
          .map { |s| s.to_json } \
        + test_cases
          .sort_by { |x| x.issue.subject }
          .map { |tc| tc.to_json }
    end

    {
      'id'        => id,
      'parent_id' => parent_id,
      'name'      => name,
      'children'  => kids,
      'state'     => { 'opened' => parent.nil? },
      'type'      => 'suite'
    }
  end
end
