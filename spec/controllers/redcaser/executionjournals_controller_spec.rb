require 'spec_helper'

describe Redcaser::ExecutionjournalsController, type: :controller do
  include LoginSupport
  include SetupSupport

  context 'logged in as admin' do
    let(:admin) { create :user, :admin }

    before :example do
      login_as admin
    end

    context 'without initial settigns' do
      it 'GET #index responds with forbidden' do
        create_project_setup_without_settings

        get :index, project_id: @project.id

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end
    end

    context 'with initial settigns' do
      it 'GET #index responds with success' do
        create_project_setup_with_settings

        get :index, project_id: @project.id

        expect(response).to have_http_status(:ok)
      end
    end
  end
end
