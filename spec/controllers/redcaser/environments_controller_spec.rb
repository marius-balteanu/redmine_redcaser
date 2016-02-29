require 'spec_helper'

describe Redcaser::EnvironmentsController, type: :controller do
  include LoginSupport
  include SetupSupport

  context 'logged in as admin' do
    let(:admin) { create :user, :admin }
    let(:environment) do
      create :execution_environment, project_id: @project.id
    end

    before(:example) { login_as admin }

    context 'without initial settigns' do
      before(:example) { create_project_setup_without_settings }

      it 'GET #show responds with forbidden' do
        get :show, project_id: @project.id, id: environment.id

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end

      it 'POST #create responds with forbidden' do
        post :create, project_id: @project.id

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end

      it 'PATCH #update responds with forbidden' do
        patch :update, project_id: @project.id, id: environment.id

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end

      it 'PUT #update responds with forbidden' do
        put :update, project_id: @project.id, id: environment.id

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end

      it 'DELETE #destroy responds with forbidden' do
        delete :destroy, project_id: @project.id, id: environment.id

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end
    end

    context 'with initial settigns' do
      before(:example) { create_project_setup_with_settings }

      it 'GET #show responds with success' do
        get :show, project_id: @project.id, id: environment.id

        expect(response).to have_http_status(:ok)
        expect(response).to render_template('redcaser/_management_environments')
      end

      it 'POST #create responds with success' do
        request_data = {
          project_id: @project.id,
          execution_environment: {name: 'name'}
        }
        post :create, request_data

        expect(response).to have_http_status(:ok)
      end

      it 'PATCH #update responds with success' do
        request_data = {
          project_id: @project.id,
          id:         environment.id,
          execution_environment: {name: 'name'}
        }
        patch :update, request_data

        expect(response).to have_http_status(:ok)
      end

      it 'PUT #update responds with success' do
        request_data = {
          project_id: @project.id,
          id:         environment.id,
          execution_environment: {name: 'name'}
        }
        put :update, request_data

        expect(response).to have_http_status(:ok)
      end

      it 'DELETE #destroy responds with success' do
        delete :destroy, project_id: @project.id, id: environment.id

        expect(response).to have_http_status(:ok)
      end
    end
  end
end
