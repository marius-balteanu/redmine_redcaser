# This patch adds ExecutionJournal linkage to User
module RedmineRedcaser
  module Patches
    module UserPatch
      def self.included(base)
        base.class_eval do
          # One-to-many relationship: (1)User <=> (*)ExecutionJournal
          has_many :execution_journals, foreign_key: 'executor_id', dependent: :nullify
        end
      end
    end
  end
end

base = User
patch = RedmineRedcaser::Patches::UserPatch
base.send(:include, patch) unless base.included_modules.include?(patch)
