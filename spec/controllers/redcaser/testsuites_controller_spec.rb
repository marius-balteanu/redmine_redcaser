require 'spec_helper'

describe Redcaser::TestsuitesController, type: :controller do
  include LoginSupport
  include SetupSupport
  # render_views

  context 'logged in as admin' do
    let(:admin) { create :user, :admin }
    let(:suite) do
      create :test_suite, project_id: @project.id
    end

    before(:example) { login_as admin }

    context 'without initial settigns' do
      before(:example) { create_project_setup_without_settings }

      it 'GET #index responds with forbidden' do
        get :index, project_id: @project.id

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end

      it 'POST #create responds with forbidden' do
        post :create, project_id: @project.id

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end

      it 'PATCH #update responds with forbidden' do
        patch :update, project_id: @project.id, id: suite.id

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end

      it 'PUT #update responds with forbidden' do
        put :update, project_id: @project.id, id: suite.id

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end

      it 'DELETE #destroy responds with forbidden' do
        delete :destroy, project_id: @project.id, id: suite.id

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end
    end

    context 'with initial settigns' do
      before(:example) { create_project_setup_with_settings }

      it 'GET #index responds with success' do
        get :index, project_id: @project.id

        expect(response).to have_http_status(:ok)
      end

      it 'POST #create responds with success' do
        post :create, project_id: @project.id, name: 'name'

        expect(response).to have_http_status(:ok)
      end

      it 'PATCH #update responds with success' do
        patch :update, project_id: @project.id, id: suite.id, name: 'name'

        expect(response).to have_http_status(:ok)
      end

      it 'PUT #update responds with success' do
        put :update, project_id: @project.id, id: suite.id, name: 'name'

        expect(response).to have_http_status(:ok)
      end

      it 'DELETE #destroy responds with success' do
        delete :destroy, project_id: @project.id, id: suite.id

        expect(response).to have_http_status(:ok)
      end
    end
  end
end
