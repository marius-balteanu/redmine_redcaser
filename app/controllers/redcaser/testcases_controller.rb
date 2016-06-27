# frozen_string_literal: true

class Redcaser::TestcasesController < RedcaserBaseController
  before_action :find_test_case, only: [:show, :update, :destroy]

  def show
    render json: {
      test_case: @test_case.to_json,
      journals:  @test_case.journals(params[:execution_suite_id])
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
