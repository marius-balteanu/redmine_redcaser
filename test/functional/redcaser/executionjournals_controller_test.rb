# frozen_string_literal: true

require_relative '../../test_helper.rb'

class Redcaser::ExecutionjournalsControllerTest < ActionController::TestCase
  include SetupSupport

  fixtures :users

  def setup
    User.current = nil
    @request.session[:user_id] = 1
  end

  def test_index_logged_in_as_admin_without_initial_settings
    create_project_setup_without_settings

    assert true
  end

  def test_index_logged_in_as_admin_with_initial_settings
    create_project_setup_with_settings

    xhr :get, :index, project_id: @project.id

    assert_response :success
  end
end
