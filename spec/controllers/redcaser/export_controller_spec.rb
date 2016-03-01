require 'spec_helper'

describe Redcaser::ExportController, type: :controller do
  include LoginSupport
  include SetupSupport

  context 'logged in as admin' do
    let(:admin) { create :user, :admin }

    before :example do
      login_as admin
    end

    context 'without initial settigns' do
      before(:example) { create_project_setup_without_settings }

      it 'GET #index responds with forbidden' do
        request_data = {
          project_id: @project.id
        }

        get :index, request_data

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end
    end

    context 'with initial settigns' do
      before(:example) { create_project_setup_with_settings }

      context 'GET #index' do
        it 'responds with bad_request when export_to not set' do
          request_data = {
            project_id: @project.id
          }

          get :index, request_data

          expect(response).to have_http_status(:bad_request)
        end
      end
    end
  end
end
