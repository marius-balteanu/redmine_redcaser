require 'spec_helper'

describe RedcaserController, type: :controller do
  include LoginSupport
  include SetupSupport
  render_views

  context 'logged in as admin' do
    let(:admin) { create :user, :admin }

    before :example do
      login_as admin
    end

    context 'GET #index without initial settigns' do
      it 'responds with forbidden' do
        create_project_setup_without_settings

        get :index, id: @project.id

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end
    end

    context 'GET #index with initial settigns' do
      it 'responds with forbidden when no plugin setting are set' do
        create_project_setup_without_settings

        get :index, id: @project.id

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end

      it 'responds with forbidden when plugin setting are set' do
        create_project_setup_with_settings

        get :index, id: @project.id

        expect(response).to have_http_status(:ok)
        expect(response).to render_template(:index)
      end
    end
  end
end
