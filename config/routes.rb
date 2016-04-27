resources :projects do
  member do
    get :redcaser, to: 'redcaser#index'
    get 'redcaser/attachment_urls', to: 'redcaser#attachment_urls'
  end

  namespace :redcaser do
    resources :environments, only: [:show, :create, :update, :destroy]
    resources :testsuites,   only: [:index, :create, :update, :destroy]

    resources :testcases, only: [:index, :update, :destroy] do
      member do
        post :copy
      end
    end

    resources :executionsuites, except: [:new, :edit]

    resources :executionjournals, only: :index
    resources :export,            only: :index
    resources :combos,            only: :index
    resources :graph,             only: :show
  end
end
