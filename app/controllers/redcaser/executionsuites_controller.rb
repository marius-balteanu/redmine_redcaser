# frozen_string_literal: true

class Redcaser::ExecutionsuitesController < RedcaserBaseController
  before_action :find_execution_suite, only: [:show]

  def index
    @execution_suites = ExecutionSuite.all

    render json: @execution_suites
  end

  def show
    render json: @execution_suite
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
    params.require(:execution_suite).permit(:name)
  end

  def find_execution_suite
    @execution_suite = ExecutionSuite.where(id: params[:id]).first
    return if @execution_suite

    render json: {errors: ['Execution Suite not found']}, status: 404
  end
end
