# This patch adds TestCase linkage to Issue
module RedmineRedcaser
  module Patches
    module IssuePatch
      def self.included(base)
        base.class_eval do
          # One-to-one relationship: (1)Issue <=> (1)TestCase
          has_one :test_case, dependent: :destroy
        end
      end
    end
  end
end

base = Issue
patch = RedmineRedcaser::Patches::IssuePatch
base.send(:include, patch) unless base.included_modules.include?(patch)
