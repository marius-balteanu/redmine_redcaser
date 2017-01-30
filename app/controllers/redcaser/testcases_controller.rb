# frozen_string_literal: true

class Redcaser::TestcasesController < RedcaserBaseController
  include ERB::Util
  include ActionView::Helpers::AssetTagHelper
  include ActionView::Helpers::UrlHelper
  include ActionView::Helpers::DateHelper
  include ApplicationHelper

  before_action :find_test_case, only: [:show, :update, :destroy]

  def show
    test_case = @test_case.to_json
    relations = @test_case.issue.relations.select {|r| r.other_issue(@test_case.issue) && r.other_issue(@test_case.issue).visible? }
    related_issues =  []

    relations.each do |relation|
      other_issue = relation.other_issue(@test_case.issue)
      related_issues << relation.to_s(other_issue) {|other| link_to_issue(other, :project => Setting.cross_project_issue_relations?)}.html_safe + " - " + other_issue.status.to_s
      # @ToDo: select only some keys (id, subject, status, assignee)
    end

    status = TestCaseStatus.includes(:execution_result)
      .find_by(test_case_id: @test_case.id, execution_suite: params[:execution_suite_id])

    if status
      name = status.execution_result_id ? status.execution_result.name : ''
      test_case['status'] = {id: status.execution_result_id, test_case_status_id: status.id, name: name}
    end

    journals = @test_case.journals(params[:execution_suite_id])
      .map do |journal|
        {
          avatar:  gravatar(journal.executor.mail, :size => "24"),
          author:  authoring(journal.created_on, journal.executor, :label => :label_updated_time_by),
          journal: journal
        }
      end

    render json: {
      test_case: test_case,
      journals:  journals,
      relations: related_issues
    }
  end

  def update
    @test_case.assign_attributes(test_case_params)

    if @test_case.save
      render json: {success: 'Test Case updated'}
    else
      render json: {errors: @test_case.errors.full_messages}, status: 400
    end
  end

  def destroy
    if @test_case.destroy
      render json: {success: 'Test Case deleted'}
    else
      render json: {errors: @test_case.errors.full_messages}, status: 400
    end
  end

  private

  def test_case_params
    params.require(:test_case).permit(:test_suite_id)
  end

  def find_test_case
    @test_case = TestCase.where(id: params[:id]).first

    unless @test_case
      render json: {error: 'Test Case not found'}, status: 404
    end
  end
end
