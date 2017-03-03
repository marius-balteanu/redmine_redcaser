# frozen_string_literal: true

class ExecutionSuite < ActiveRecord::Base
  belongs_to :environment, class_name: 'ExecutionEnvironment'
  belongs_to :project
  belongs_to :query
  belongs_to :version

  has_many :execution_suite_test_cases, class_name: "ExecutionSuiteTestCase", dependent: :delete_all
  has_many :test_cases, through: :execution_suite_test_cases

  validates_uniqueness_of :execution_suite, scope: [:target_version]

end
