# frozen_string_literal: true

# Callback methods to subscribe on Redmine events

require File.expand_path("../../../../app/helpers/redcaser_helper", __FILE__)

class RedmineRedcaserOverrideHook < Redmine::Hook::ViewListener

  include RedcaserHelper

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

  def view_projects_roadmap_version_bottom(context = {})
    execution_suites = ExecutionSuite.where(version_id: context[:version].id)
    test_cases = TestCase.joins(:execution_suite_test_case)
      .where(execution_suite_test_case: {execution_suite_id: execution_suites})
    test_case_statuses = TestCaseStatus.where(test_case_id: test_cases, execution_suite_id: execution_suites).to_a
    results = ExecutionResult.all
    txt = "<span style='color: red'>Total #{RedcaserSettings.tracker_name.downcase.pluralize}:</span> <b>" + test_cases.size.to_s + "</b>"
    for r in results do
      count = 0
      for t in test_case_statuses do
        count += 1 if t.execution_result_id == r.id
      end
      txt = txt + " [" + r.name + "=" + count.to_s + "]"
    end
    txt = txt + "<br/>"
  end


  def controller_issues_new_after_save(context = {})
    issue  = context[:issue]
    params = context[:params]

    return if issue_id.blank? || relation_type.blank?

    relation = if relation_type == 'relates'
      IssueRelation::TYPE_RELATES
    elsif relation_type == 'blocked'
      IssueRelation::TYPE_BLOCKS
    end

    test_case_issue = Issue.find_by_id(issue_id.to_i)

    IssueRelation.create!(
      issue_from:    issue,
      issue_to:      test_case_issue,
      relation_type: relation
    )
  end

  render_on :view_issues_form_details_bottom, :partial => "issues/test_case_data_fields_form"
  render_on :view_issues_show_details_bottom, :partial => "issues/test_case_test_suite_field"
  render_on :view_issues_show_description_bottom, :partial => "issues/test_case_data_fields"
end
