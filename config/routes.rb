resources :projects do
  member do
    get :redcaser, to: 'redcaser#index'
    get 'redcaser/get_attachment_urls', to: 'redcaser#get_attachment_urls'
  end

  namespace :redcaser do
    resources :environments, only: [:index, :create, :update, :destroy]
    resources :testsuites, only: [:index, :create, :update, :destroy]

    resources :testcases, only: [:index, :update] do
      member do
        post :copy
      end
    end

    resources :executionsuites, except: [:new, :edit]
    resources :executionjournals, only: :index
    resources :export, only: :index
    resources :graph, only: :show
    resources :combos, only: :index
  end
end
