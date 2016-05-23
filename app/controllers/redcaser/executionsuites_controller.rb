# frozen_string_literal: true

class Redcaser::ExecutionsuitesController < RedcaserBaseController
  before_action :find_execution_suite, only: [:show, :edit, :update, :destroy]

  def index
    @execution_suites = ExecutionSuite.all

    render json: {
      project:          @project,
      execution_suites: @execution_suites
    }
  end

  def show
    @query = @execution_suite.query

    @test_cases   = @execution_suite.test_cases
    test_case_ids = @test_cases.map(&:id).uniq

    @statuses = TestCaseStatus.includes(:execution_result)
      .where(test_case_id: test_case_ids, execution_suite: @execution_suite)
      .to_a
      .reduce({}) { |total, element| total[element.test_case_id] = element; total }

    test_cases = @test_cases.map(&:to_json).map do |element|
      status = @statuses[element['id']]

      if status
        name = status.execution_result.name

        element['status'] = {id: status.execution_result_id, test_case_status_id: status.id ,name: name}
      end

      element
    end

    @execution_results = ExecutionResult.all.to_a

    render json: {
      execution_results: @execution_results,
      execution_suite:   @execution_suite,
      test_cases:        test_cases
    }
  end

  def new
    @environments = ExecutionEnvironment.where(project: @project).to_a

    # Project specific queries and global queries
    @queries = IssueQuery.visible
      .where('project_id IS NULL OR project_id = ?', @project.id)
      .order('queries.name ASC')
      .to_a

    @versions = Version.where(project: @project).to_a

    render json: {
      environments: @environments,
      queries:      @queries,
      versions:     @versions
    }
  end

  def edit
    @environments = ExecutionEnvironment.where(project: @project).to_a

    # Project specific queries and global queries
    @queries = IssueQuery.visible
      .where('project_id IS NULL OR project_id = ?', @project.id)
      .order('queries.name ASC')
      .to_a

    @versions = Version.where(project: @project).to_a

    render json: {
      execution_suite: @execution_suite,
      environments:    @environments,
      queries:         @queries,
      versions:        @versions
    }
  end

  def create
    @execution_suite = ExecutionSuite.new(execution_suite_params)

    if @execution_suite.save
      test_cases = test_cases_params[:test_cases]

      if test_cases
        test_cases.each do |id|
          ExecutionSuiteTestCase.create!(
            execution_suite_id: @execution_suite.id,
            test_case_id:       id
          )
        end
      end

      render json: {
        success:         'Execution Suite created',
        execution_suite: @execution_suite
      }
    else
      render json: {errors: @execution_suite.errors.full_messages}, status: 400
    end
  end

  def update
    @execution_suite.assign_attributes(execution_suite_params)

    if @execution_suite.save
      ExecutionSuiteTestCase
        .where(execution_suite_id: @execution_suite.id)
        .delete_all

      test_cases = test_cases_params[:test_cases]

      if test_cases
        test_cases.each do |id|
          ExecutionSuiteTestCase.create!(
            execution_suite_id: @execution_suite.id,
            test_case_id:       id
          )
        end
      end

      render json: {
        success:         'Execution Suite updated',
        execution_suite: @execution_suite
      }
    else
      render json: {errors: @execution_suite.errors.full_messages}, status: 400
    end
  end

  def destroy
    if @execution_suite.destroy
      render json: {success: 'Execution Suite deleted'}
    else
      render json: {errors: @execution_suite.errors.full_messages}, status: 400
    end
  end

  private

  def execution_suite_params
    params.require(:execution_suite).permit(
      :environment_id, :name, :query_id, :version_id
    )
  end

  def test_cases_params
    params.require(:execution_suite).permit(test_cases: [])
  end

  def find_execution_suite
    @execution_suite = ExecutionSuite.where(id: params[:id]).first
    return if @execution_suite

    render json: {errors: ['Execution Suite not found']}, status: 404
  end
end
