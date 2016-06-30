# This patch adds TestCase linkage to Issue
module RedmineRedcaser
  module Patches
    module IssuePatch
      def self.included(base)
        base.send :include, InstanceMethods
        base.class_eval do
          # One-to-one relationship: (1)Issue <=> (1)TestCase
          has_one :test_case, dependent: :destroy

          validate :special_invalidation
        end
      end

      module InstanceMethods
        def invalidate(message)
          @invalid ||= []

          @invalid << message

          @invalid
        end

        def special_invalidation
          return unless @invalid

          @invalid.each do |message|
            self.errors.add(:base, message)
          end
        end
      end
    end
  end
end

base = Issue
patch = RedmineRedcaser::Patches::IssuePatch
base.send(:include, patch) unless base.included_modules.include?(patch)
