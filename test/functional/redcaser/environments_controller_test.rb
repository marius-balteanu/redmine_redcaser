require_relative '../../test_helper.rb'

class Redcaser::EnvironmentsControllerTest < ActionController::TestCase
  include SetupSupport

  def setup
    User.current = nil
    @request.session[:user_id] = 1
  end

  def test_destroy_logged_in_as_admin_without_initial_settings_forbidden
    create_project_setup_without_settings
    @environment = ExecutionEnvironment.create(name: 'env1', project: @project)

    xhr :delete, :destroy, id: @environment.id, project_id: @project.id

    assert_response :forbidden
  end

  def test_destroy_logged_in_as_admin_with_initial_settings_success
    create_project_setup_with_settings
    @environment = ExecutionEnvironment.create(name: 'env1', project: @project)

    xhr :delete, :destroy, id: @environment.id, project_id: @project.id

    assert_response :success
  end

  def test_destroy_logged_in_as_admin_with_initial_settings_with_execution_suite
    create_project_setup_with_settings

    @environment     = ExecutionEnvironment.create(name: 'env1', project: @project)
    @execution_suite = ExecutionSuite.create(name: 'execution suite', environment: @environment)

    xhr :delete, :destroy, id: @environment.id, project_id: @project.id

    assert_response :forbidden
  end
end
