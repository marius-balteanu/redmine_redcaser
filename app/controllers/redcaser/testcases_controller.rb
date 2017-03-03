# frozen_string_literal: true

class Redcaser::TestcasesController < RedcaserBaseController
  include ERB::Util
  include ActionView::Helpers::AssetTagHelper
  include ActionView::Helpers::UrlHelper
  include ActionView::Helpers::DateHelper
  include ApplicationHelper
  helper :issues
  helper :redcaser

  before_action :authorize, :only => [:show, :update, :destroy]
  before_action :find_test_case, only: [:show, :update, :destroy]

  def show
    @relations = @test_case.issue.relations.select {|r| r.other_issue(@test_case.issue) && r.other_issue(@test_case.issue).visible? }
    @journals = @test_case.journals(params[:execution_suite_id]).preload(:executor => :email_address).preload(:result)
    @test_case_result = TestCaseStatus.where(test_case: @test_case, execution_suite: params[:execution_suite_id]).first
    @test_case_statuses = ExecutionResult.all().order(:order_number => :asc).pluck(:name, :id);

    unless @test_case_result
      @test_case_statuses.insert(0, [l(:label_test_case_not_run), ''])
    end
    render :partial => 'test_cases/show'

  rescue ActiveRecord::RecordNotFound
    render_404
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
