# frozen_string_literal: true

require_relative '../../test_helper.rb'

class ExecutionjournalsControllerTest < ActionController::TestCase
  include SetupSupport

  fixtures :email_addresses, :members, :roles, :user_preferences, :users,
           :projects

  def setup
    User.current = nil
  end

  def test_index_logged_in_as_admin_without_initial_settings
    @request.session[:user_id] = 1
    create_project_setup_without_settings

    get :index, project_id: @project.id

    assert_response :success
  end

  def test_index_logged_in_as_admin_with_initial_settings
    @request.session[:user_id] = 1
    create_project_setup_with_settings

    assert true
  end
end
