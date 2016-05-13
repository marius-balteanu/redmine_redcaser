# frozen_string_literal: true

class Redcaser::EnvironmentsController < RedcaserBaseController
  def create
    @environment = ExecutionEnvironment.new(environment_params)
    @environment.project = @project

    if @environment.save
      render json: {success: 'Environment created'}
    else
      render json: {errors: @environment.errors.full_messages}, status: 400
    end
  end

  private

  def environment_params
    params.require(:environment).permit(:name)
  end
end
