require_dependency 'issue'
require_dependency 'test_case'

module RedmineRedcaser
  module Patches

    module IssuePatch
      def self.included(base)
        base.send :include, InstanceMethods
        base.class_eval do
          has_one :test_case, dependent: :destroy

          safe_attributes 'test_case_attributes'
          accepts_nested_attributes_for :test_case, :allow_destroy => true
          alias_method :test_case_without_default, :test_case
          alias_method :test_case, :test_case_with_default
        end
      end

      module InstanceMethods

        def test_case_with_default
          test_case_without_default || build_test_case
        end
      end
    end

  end
end

unless Issue.included_modules.include?(RedmineRedcaser::Patches::IssuePatch)
  Issue.send(:include, RedmineRedcaser::Patches::IssuePatch)
end
