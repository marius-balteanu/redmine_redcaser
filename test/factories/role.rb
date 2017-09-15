FactoryGirl.define do
  factory :role do
    sequence(:name) {|count| "Sample Name #{ count }" }
    sequence :position

    trait :manager do
      builtin 0
      issues_visibility 'all'
      users_visibility 'all'
      permissions [:add_project, :edit_project, :close_project,
        :select_project_modules, :manage_members, :manage_versions,
        :manage_categories, :view_issues, :add_issues, :edit_issues,
        :copy_issues, :manage_issue_relations, :manage_subtasks,
        :add_issue_notes, :delete_issues, :view_issue_watchers,
        :add_issue_watchers, :set_issues_private, :set_notes_private,
        :view_private_notes, :delete_issue_watchers, :manage_public_queries,
        :save_queries, :view_gantt, :view_calendar, :log_time,
        :view_time_entries, :edit_time_entries, :delete_time_entries,
        :manage_news, :comment_news, :view_documents, :add_documents,
        :edit_documents, :delete_documents, :view_wiki_pages,
        :export_wiki_pages, :view_wiki_edits, :edit_wiki_pages,
        :delete_wiki_pages_attachments, :protect_wiki_pages, :delete_wiki_pages,
        :rename_wiki_pages, :add_messages, :edit_messages, :delete_messages,
        :manage_boards, :view_files, :manage_files, :browse_repository,
        :manage_repository, :view_changesets, :manage_related_issues,
        :manage_project_activities]
    end

    trait :developer do
      builtin 0
      issues_visibility 'default'
      users_visibility 'all'
      permissions [:edit_project, :manage_members, :manage_versions,
        :manage_categories, :view_issues, :add_issues, :edit_issues,
        :copy_issues, :manage_issue_relations, :manage_subtasks,
        :add_issue_notes, :delete_issues, :view_issue_watchers, :save_queries,
        :view_gantt, :view_calendar, :log_time, :view_time_entries,
        :edit_own_time_entries, :manage_news, :comment_news, :view_documents,
        :add_documents, :edit_documents, :delete_documents, :view_wiki_pages,
        :view_wiki_edits, :edit_wiki_pages, :protect_wiki_pages,
        :delete_wiki_pages, :add_messages, :edit_own_messages,
        :delete_own_messages, :manage_boards, :view_files, :manage_files,
        :browse_repository, :view_changesets]
    end

    trait :reporter do
      builtin 0
      issues_visibility 'default'
      users_visibility 'all'
      permissions [:edit_project, :manage_members, :manage_versions,
        :manage_categories, :view_issues, :add_issues, :edit_issues,
        :manage_issue_relations, :add_issue_notes, :view_issue_watchers,
        :save_queries, :view_gantt, :view_calendar, :log_time,
        :view_time_entries, :manage_news, :comment_news, :view_documents,
        :add_documents, :edit_documents, :delete_documents, :view_wiki_pages,
        :view_wiki_edits, :edit_wiki_pages, :delete_wiki_pages, :add_messages,
        :manage_boards, :view_files, :manage_files, :browse_repository,
        :view_changesets]
    end

    trait :non_member do
      builtin 1
      issues_visibility 'default'
      users_visibility 'all'
      permissions [:view_issues, :add_issues, :edit_issues,
        :manage_issue_relations, :add_issue_notes, :save_queries, :view_gantt,
        :view_calendar, :log_time, :view_time_entries, :comment_news,
        :view_documents, :view_wiki_pages, :view_wiki_edits, :edit_wiki_pages,
        :add_messages, :view_files, :manage_files, :browse_repository,
        :view_changesets]
    end

    trait :anonymous do
      builtin 2
      issues_visibility 'default'
      users_visibility 'all'
      permissions [:view_issues, :add_issue_notes, :view_gantt, :view_calendar,
        :view_time_entries, :view_documents, :view_wiki_pages, :view_wiki_edits,
        :view_files, :browse_repository, :view_changesets]
    end
  end
end
