module RedmineRedcaser
  module Hooks
    class ViewsIssuesHook < Redmine::Hook::ViewListener

      def controller_issues_edit_after_save(context = {})
        journal_details = JournalDetail.find_by_journal_id(context[:journal])
        if journal_details.nil? then
          # ???
          return
        end
        if journal_details.prop_key == 'tracker_id' then
          if journal_details.value == RedcaserSettings.tracker_id.to_s then
            controller_issues_new_after_save(context)
          elsif journal_details.old_value == RedcaserSettings.tracker_id.to_s then
            tc = TestCase.find_by_issue_id(context[:issue].id)
            tc.destroy if !tc.nil?
          end
        end
      end

      def controller_issues_new_after_save(context = {})
        issue  = context[:issue]
        params = context[:params]

        issue_id      = params[:test_case].try(:[], :issue_id)
        relation_type = params[:test_case].try(:[], :relation_type)

        return if issue_id.blank? || relation_type.blank?

        relation = if relation_type == 'relates'
          IssueRelation::TYPE_RELATES
        elsif relation_type == 'blocked'
          IssueRelation::TYPE_BLOCKED
        end

        test_case_issue = Issue.find_by_id(issue_id.to_i)

        IssueRelation.create!(
          issue_from:    test_case_issue,
          issue_to:      issue,
          relation_type: relation
        )
      end

      render_on :view_issues_form_details_bottom, :partial => "issues/test_case_data_fields_form"
      render_on :view_issues_show_details_bottom, :partial => "issues/test_case_test_suite_field"
      render_on :view_issues_show_description_bottom, :partial => "issues/test_case_data_fields"
    end
  end
end
