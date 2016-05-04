# frozen_string_literal: true

class Redcaser::TestsuitesController < RedcaserBaseController
  before_action :find_test_suite,         only: [:update, :destroy]
  before_action :provided_parent_exists?, only: [:create, :update]

  def index
    testsuites = TestSuite.for_project(@project)

    elements = testsuites.map(&:to_json)

    render json: elements
  end

  def create
    @test_suite = TestSuite.new(test_suite_params)
    @test_suite.project = @project

    if @test_suite.save
      render json: {success: 'Test Suite created.'}
    else
      render json: {errors: @test_suite.error_messages}
    end
  end

  def update
    @test_suite.assign_attributes(test_suite_params)

    if @test_suite.save
      render json: {success: 'Test Suite updated.'}
    else
      render json: {errors: @test_suite.error_messages}
    end
  end

  def destroy
    if @test_suite.destroy
      render json: {success: 'Test Suite deleted.'}
    else
      render json: {errors: @test_suite.error_messages}
    end
  end

  private

  def test_suite_params
    params.require(:test_suite).permit(:name, :parent_id)
  end

  def find_test_suite
    @test_suite = TestSuite.where(id: params[:id]).first
    return if @test_suite

    render json: {error: 'Test Suite not found.'}, status: 404
  end

  def provided_parent_exists?
    parent_id = params.try(:test_suite).try(:parent_id)
    return unless parent_id

    parent_exists = TestSuite.where(id: parent_id).exists?
    return if parent_exists

    render json: {error: 'Parent Test Suite not found.'}, status: 404
  end
end
