# frozen_string_literal: true

class ExecutionSuite < ActiveRecord::Base
  belongs_to :environment, class_name: 'ExecutionEnvironment'
  belongs_to :project
  belongs_to :query
  belongs_to :version

  has_many :execution_suite_test_cases
  has_many :test_cases, through: :execution_suite_test_cases
end
