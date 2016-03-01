require 'spec_helper'

describe Redcaser::GraphController, type: :controller do
  include LoginSupport
  include SetupSupport

  context 'logged in as admin' do
    let(:admin) { create :user, :admin }

    before :example do
      login_as admin
    end

    context 'without initial settigns' do
      before(:example) { create_project_setup_without_settings }

      it 'GET #show responds with forbidden' do
        request_data = {
          project_id: @project.id,
          id:         1
        }

        get :show, request_data

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end
    end

    context 'with initial settigns' do
      before(:example) { create_project_setup_with_settings }

      it 'GET #show responds with success' do
        request_data = {
          project_id: @project.id,
          id:         1
        }

        get :show, request_data

        expect(response).to have_http_status(:ok)
      end
    end
  end
end
