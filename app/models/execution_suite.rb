# frozen_string_literal: true

class ExecutionSuite < ActiveRecord::Base
  belongs_to :environment, class_name: 'ExecutionEnvironment'
  belongs_to :project
  belongs_to :query
  belongs_to :version
end
