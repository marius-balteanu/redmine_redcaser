# frozen_string_literal: true

class Redcaser::EnvironmentsController < RedcaserBaseController
  before_action :find_environment, only: [:edit, :update, :destroy]
  before_action :forbid_destroy,   only: [:destroy]

  def edit
    render json: {environment: @environment}
  end

  def create
    @environment = ExecutionEnvironment.new(environment_params)
    @environment.project = @project

    if @environment.save
      render json: {success: 'Environment created', environment: @environment}
    else
      render json: {errors: @environment.errors.full_messages}, status: 400
    end
  end

  def update
    @environment.assign_attributes(environment_params)

    if @environment.save
      render json: {success: 'Environment updated', environment: @environment}
    else
      render json: {errors: @environment.errors.full_messages}, status: 400
    end
  end

  def destroy
    if @environment.destroy
      render json: {success: 'Environment deleted'}
    else
      render json: {errors: @environment.errors.full_messages}, status: 400
    end
  end

  private

  def environment_params
    params.require(:environment).permit(:name)
  end

  def find_environment
    @environment = ExecutionEnvironment.where(id: params[:id]).first
    return if @environment

    render json: {errors: ['Environment not found']}, status: 404
  end

  def forbid_destroy
    exists = ExecutionSuite.where(environment_id: @environment.id).exists?
    return unless exists

    render(
      json: {errors: ['Can not delete the execution suite since it is in use!']},
      status: :forbidden
    )
  end
end
