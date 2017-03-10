# frozen_string_literal: true

class ExecutionSuite < ActiveRecord::Base
  belongs_to :environment, class_name: 'ExecutionEnvironment'
  belongs_to :project
  belongs_to :query
  belongs_to :version

  validates :name, length: { minimum: 3 }
  validates :name, length: { maximum: 127 }

  has_many :execution_suite_test_cases, class_name: "ExecutionSuiteTestCase", dependent: :delete_all
  has_many :test_cases, through: :execution_suite_test_cases
end
