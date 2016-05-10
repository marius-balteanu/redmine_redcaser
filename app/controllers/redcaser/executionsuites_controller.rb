# frozen_string_literal: true

class Redcaser::ExecutionsuitesController < RedcaserBaseController
  before_action :find_execution_suite, only: [:show]

  def index
    @execution_suites = ExecutionSuite.all

    render json: @execution_suites
  end

  def show
    @query = @execution_suite.query

    issues    = @query.issues
    issue_ids = issues.map(&:id).uniq

    @test_cases   = TestCase.where(issue_id: issue_ids).to_a
    test_case_ids = @test_cases.map(&:id).uniq

    @statuses = TestCaseStatus
      .includes(:execution_result)
      .where(id: test_case_ids, execution_suite: @execution_suite)
      .to_a
      .reduce({}) { |total, element| total[element.id] = element; total }

    test_cases = @test_cases.map(&:to_json).map do |element|
      element['status'] = @statuses[element['id']]
      element
    end

    render json: {
      execution_suite: @execution_suite,
      test_cases:      test_cases
    }
  end

  def new
    @environments = ExecutionEnvironment.where(project: @project).to_a
    @queries      = Query.all.to_a
    @versions     = Version.where(project: @project).to_a

    render json: {
      environments: @environments,
      queries:      @queries,
      versions:     @versions
    }
  end

  def create
    @execution_suite = ExecutionSuite.new(execution_suite_params)

    if @execution_suite.save
      render json: {success: 'Execution Suite created.'}
    else
      render json: {errors: @execution_suite.error_messages}, status: 400
    end
  end

  private

  def execution_suite_params
    params.require(:execution_suite).permit(
      :environment_id, :name, :query_id, :version_id
    )
  end

  def find_execution_suite
    @execution_suite = ExecutionSuite.where(id: params[:id]).first
    return if @execution_suite

    render json: {errors: ['Execution Suite not found']}, status: 404
  end
end
