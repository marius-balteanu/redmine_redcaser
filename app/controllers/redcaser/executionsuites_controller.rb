# frozen_string_literal: true

class Redcaser::ExecutionsuitesController < RedcaserBaseController
  def index
    @execution_suites = ExecutionSuite.all

    render json: @execution_suites
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
end
