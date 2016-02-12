# This patch adds ExecutionJournal linkage to Version
module RedmineRedcaser
  module Patches
    module VersionPatch
      def self.included(base)
        base.class_eval do
          # One-to-many relationship: (1)Version <=> (*)ExecutionJournal
          has_many :execution_journals, dependent: :destroy
        end
      end
    end
  end
end

base = Version
patch = RedmineRedcaser::Patches::VersionPatch
base.send(:include, patch) unless base.included_modules.include?(patch)
