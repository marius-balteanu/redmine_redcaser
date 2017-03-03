# frozen_string_literal: true

class Redcaser::TestsuitesController < RedcaserBaseController
  before_action :find_test_suite,         only: [:edit, :update, :destroy]
  before_action :find_all_test_suites,    only: [:new, :edit]
  before_action :provided_parent_exists?, only: [:create, :update]

  def index
    @test_suites = TestSuite.for_project(@project)
    @test_cases  = TestCase.where(:test_suite => @test_suites)

    render json: {
      project:     @project.identifier,
      test_cases:  @test_cases.map(&:to_json),
      test_suites: @test_suites.map(&:to_json)
    }
  end

  def new
    render json: {test_suites: @test_suites.to_a.map(&:to_json)}
  end

  def edit
    result = {
      test_suite:  @test_suite.to_json,
      test_suites: @test_suites.where("#{TestSuite.table_name}.parent_id != ? OR #{TestSuite.table_name}.parent_id IS NULL", @test_suite.id).to_a.map(&:to_json)
    }

    render json: result
  end

  def create
    @test_suite = TestSuite.new(test_suite_params)
    @test_suite.project = @project

    if @test_suite.save
      render json: {success: 'Test Suite created', test_suite: @test_suite}
    else
      render json: {errors: @test_suite.errors.full_messages}, status: 400
    end
  end

  def update
    @test_suite.assign_attributes(test_suite_params)

    if @test_suite.save
      render json: {success: 'Test Suite updated', test_suite: @test_suite}
    else
      render json: {errors: @test_suite.errors.full_messages}, status: 400
    end
  end

  def destroy
    if @test_suite.has_children? || @test_suite.has_cases?
      render json: {errors: ['Cannot delete test suite while not empty']}, status: 400

      return
    end

    if @test_suite.destroy
      render json: {success: 'Test Suite deleted'}
    else
      render json: {errors: @test_suite.errors.full_messages}, status: 400
    end
  end

  private

  def test_suite_params
    params.require(:test_suite).permit(:name, :parent_id)
  end

  def find_test_suite
    @test_suite = TestSuite.where(id: params[:id]).first
    return if @test_suite

    render json: {error: 'Test Suite not found'}, status: 404
  end

  def find_all_test_suites
    @test_suites = TestSuite.where(project: @project)
  end

  def provided_parent_exists?
    parent_id = params.try(:test_suite).try(:parent_id)
    return unless parent_id

    parent_exists = TestSuite.where(id: parent_id).exists?
    return if parent_exists

    render json: {error: 'Parent Test Suite not found'}, status: 404
  end
end
