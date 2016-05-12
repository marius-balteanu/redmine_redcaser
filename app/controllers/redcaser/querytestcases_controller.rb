# frozen_string_literal: true

class Redcaser::QuerytestcasesController < RedcaserBaseController
  before_action :find_query

  def show
    issues    = @query.issues
    issue_ids = issues.map(&:id).uniq

    @test_cases = TestCase.where(issue_id: issue_ids).to_a.map(&:to_json)

    render json: {test_cases: @test_cases}
  end

  private

  def find_query
    @query = Query.where(id: params[:id]).first

    return if @query
    render json: {errors: ['Query not found']}, status: 404
  end
end
