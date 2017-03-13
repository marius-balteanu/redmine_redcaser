# frozen_string_literal: true

class TestSuite < ActiveRecord::Base
  acts_as_tree order: 'name'
  has_many :test_cases, dependent: :destroy
  belongs_to :project
  attr_protected :id

  validates :name, length: { minimum: 3 }
  validates :name, length: { maximum: 127 }
  validates_uniqueness_of :name, scope: [:project_id]

  def self.for_project(project)
    TestSuite
      .where(project_id: project.id)
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
    {
      'id'        => id,
      'name'      => name,
      'parent_id' => parent_id,
    }
  end
end
