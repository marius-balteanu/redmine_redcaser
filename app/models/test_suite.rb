class TestSuite < ActiveRecord::Base
  acts_as_tree order: 'name'
  has_many :test_cases, dependent: :destroy
  belongs_to :project
  attr_protected :id

  # Returns root test suite linked to the project and creates one and nested
  # 'system' test suites (for 'obsolete' and 'unsorted' test cases) if they
  # don't exist yet.
  def self.get_root_for_project(project)
    test_suite = TestSuite
      .includes({test_cases: [:execution_suites, {issue: [:author, :status]}]}, :children)
      .where(project_id: project.id)
      .first
    unless test_suite
      test_suite = TestSuite.create(name: project.name)
      test_suite.project = project
      test_suite.children << TestSuite.create(name: '.Obsolete')
      test_suite.children << TestSuite.create(name: '.Unsorted')
      test_suite.save
    end
    test_suite
  end

  def self.get_obsolete(project)
    TestSuite.get_root_for_project(project).children.where(name: '.Obsolete').first
  end

  # TODO: Move to view f.ex. using JBuilder
  #       (https://github.com/rails/jbuilder).
  def to_json(context)
    if parent_id
      kids = children.includes({test_cases: [:execution_suites, issue: [:author, :status]]}, :children)
          .map { |s| s.to_json(context) } \
        + test_cases
          .sort_by { |x| x.issue.subject }
          .map { |tc| tc.to_json(context) }
    else
      kids = children.includes({test_cases: [:execution_suites, issue: [:author, :status]]}, :children)
          .select { |x| (x.name != '.Obsolete') && (x.name != '.Unsorted')}
          .map { |s| s.to_json(context) } \
        + test_cases
          .sort_by { |x| x.issue.subject }
          .map { |tc| tc.to_json(context) } \
        + children.includes({test_cases: [:execution_suites, issue: [:author, :status]]}, :children)
          .select { |x| (x.name == '.Obsolete') || (x.name == '.Unsorted')}
          .map { |s| s.to_json(context) }
    end

    {
      'suite_id'       => id,
      'text'           => name,
      'id'             => ((name != '.Obsolete') && (name != '.Unsorted')) ? "suite_#{id}" : name,
      'expandable'     => true,
      'expanded'       => false,
      'editable'       => !(
        ((name == '.Unsorted') || (name == '.Obsolete')) && parent.parent.nil?
      ) && !parent.nil?,
      'children'       => kids,
      'draggable'      => (
        !parent.nil? && !(
          ((name == '.Unsorted') || (name == '.Obsolete')) && parent.parent.nil?
        )
      ),
      'state'          => { 'opened' => parent.nil? },
      'type'           => 'suite'
    }
  end
end
