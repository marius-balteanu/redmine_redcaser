require 'spec_helper'

describe Redcaser::CombosController, type: :controller do
  include LoginSupport
  include SetupSupport
  # render_views

  context 'logged in as admin' do
    let(:admin) { create :user, :admin }

    before :example do
      login_as admin
    end

    context 'GET #index without initial settigns' do
      # it 'responds with forbidden' do
      #   create_project_setup_without_settings
      #
      #   get :index, project_id: @project.id
      #
      #   expect(response).to have_http_status(:forbidden)
      #   expect(response).to render_template('common/error')
      # end
    end

    context 'GET #index with initial settigns' do
      # it 'responds with forbidden when no plugin setting are set' do
      #   create_project_setup_without_settings
      #
      #   get :index, project_id: @project.id
      #
      #   expect(response).to have_http_status(:forbidden)
      #   expect(response).to render_template('common/error')
      # end

      it 'responds with success when plugin setting are set' do
        create_project_setup_with_settings

        get :index, project_id: @project.id

        expect(response).to have_http_status(:ok)
      end

      it 'renders correct partial when params[:button] is missing' do
        create_project_setup_with_settings

        get :index, project_id: @project.id

        expect(response).to render_template('redcaser/_report_combos')
      end


      it 'renders correct partial when params[:button] is set' do
        create_project_setup_with_settings

        get :index, project_id: @project.id, button: true

        expect(response).to render_template('redcaser/_report_download_button')
      end
    end
  end
end
