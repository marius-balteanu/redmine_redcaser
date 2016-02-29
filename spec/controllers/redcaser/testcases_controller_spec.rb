require 'spec_helper'

describe Redcaser::TestcasesController, type: :controller do
  include LoginSupport
  include SetupSupport
  # render_views

  context 'logged in as admin' do
    let(:admin) { create :user, :admin }
    let(:issue) do
      create(
        :issue,
        author_id:   @author.id,
        priority_id: @priority.id,
        project_id:  @project.id,
        tracker_id:  @other_tracker.id
      )
    end
    let(:suite) do
      create :test_suite, project_id: @project.id
    end
    let(:test_case) do
      create :test_case, test_suite_id: suite.id, issue_id: issue.id
    end

    before(:example) { login_as admin }

    context 'without initial settigns' do
      before(:example) { create_project_setup_without_settings }

      it 'GET #index responds with forbidden' do
        get :index, project_id: @project.id

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end

      it 'PATCH #update responds with forbidden' do
        patch :update, project_id: @project.id, id: test_case.id

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end

      it 'PUT #update responds with forbidden' do
        put :update, project_id: @project.id, id: test_case.id

        expect(response).to have_http_status(:forbidden)
        expect(response).to render_template('common/error')
      end

      it 'POST #copy responds with forbidden' do
        post :copy, project_id: @project.id, id: test_case.id

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

      it 'PATCH #update responds with success' do
        patch :update, project_id: @project.id, id: test_case.id

        expect(response).to have_http_status(:ok)
      end

      it 'PUT #update responds with success' do
        put :update, project_id: @project.id, id: test_case.id

        expect(response).to have_http_status(:ok)
      end

      it 'POST #copy responds with success' do
        test_case
        post :copy, project_id: @project.id, id: test_case.id, dest_project: @project.id

        expect(response).to have_http_status(:ok)
      end
    end
  end
end
