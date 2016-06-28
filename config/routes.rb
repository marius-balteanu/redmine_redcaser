# frozen_string_literal: true

resources :projects do
  member do
    get :redcaser, to: 'redcaser#index'
    get 'redcaser/attachment_urls', to: 'redcaser#attachment_urls'
  end

  namespace :redcaser do
    resources :environments
    resources :testsuites, except: [:show]

    resources :testcases,        only: [:show, :update, :destroy]
    resources :testcasestatuses, only: [:create, :update]

    resources :executionsuites

    resources :querytestcases, only: :show

    resources :executionjournals, only: :index
    resources :export,            only: :index
    resources :combos,            only: :index
    resources :graph,             only: :show
  end
end
