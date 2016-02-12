# This patch adds TestSuite, ExecutionSuite and ExecutionEnvironment linkages to Project
module RedmineRedcaser
  module Patches
    module ProjectPatch
      def self.included(base)
        base.class_eval do
          # One-to-one relationship: (1)Project <=> (1)TestSuite
          has_one  :test_suite, dependent: :destroy

          # One-to-many relationship: (1)Project <=> (*)ExecutionSuite
          has_many :execution_suites, dependent: :destroy

          # One-to-many relationship: (1)Project <=> (*)ExecutionEnvironment
          has_many :execution_environments, dependent: :destroy
        end
      end
    end
  end
end

base = Project
patch = RedmineRedcaser::Patches::ProjectPatch
base.send(:include, patch) unless base.included_modules.include?(patch)
