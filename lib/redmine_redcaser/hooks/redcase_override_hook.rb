# frozen_string_literal: true

# Callback methods to subscribe on Redmine events

require File.expand_path("../../../../app/helpers/redcaser_helper", __FILE__)

module RedmineRedcaser
  module Hooks
    class RedcaseOverrideHook < Redmine::Hook::ViewListener
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

      def controller_issues_new_after_save(context = {})
        if context[:issue].tracker.id != RedcaserSettings.tracker_id then
          return
        end

        params = context[:params]

        x = TestCase.create(issue: context[:issue], test_suite_id: params[:test_suite_id])
      end

      def view_issues_form_details_bottom(context = {})
        issue, form = context[:issue], context[:form]

        return '' unless issue.tracker_id == RedcaserSettings.tracker_id

        test_suite_id = context[:request][:test_suite_id]
        test_suite = TestSuite.where(id: test_suite_id).first

        test_suites = TestSuite.select(:id, :name).order(:name).to_a

        label = '<label for="test_suite_id">Test Suite</label>'

        options = test_suites.reduce('') do |total, element|
          name = CGI::escapeHTML(element.name)

          result = if test_suite && test_suite.id == element.id
              '<option value="' + element.id.to_s + '" selected="selected">' + name + '</option>'
            else
              '<option value="' + element.id.to_s + '">' + name + '</option>'
            end
          total += result
        end

        select = '<select id="test_suite_id" name="test_suite_id">' + options + '</select>'

        return '<p>' + label + select + '</p>'.html_safe
      end

      def view_projects_roadmap_version_bottom(context = {})
        test_cases = ExecutionJournal.where({version_id: context[:version]}).map { |x| x.test_case }.uniq
        issues = Issue.where(fixed_version_id: context[:version].id).collect { |x| x.id }
        test_cases = TestCase.where({issue_id: issues})
        results = ExecutionResult.all
        txt = "<span style='color: red'>Total #{RedcaserSettings.tracker_name.downcase.pluralize}:</span> <b>" + test_cases.size.to_s + "</b>"
        for r in results do
          count = 0
          for t in test_cases do
            journals = ExecutionJournal.where({test_case_id: t.id, result_id: r.id})
            count = count + journals.size if !journals.nil?
          end
          txt = txt + " [" + r.name + "=" + count.to_s + "]"
        end
        txt = txt + "<br/>"
      end
    end
  end
end
