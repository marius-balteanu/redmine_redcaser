resources :projects do
  member do
    get :redcaser, to: 'redcase#index'
    get 'redcaser/get_attachment_urls', to: 'redcase#get_attachment_urls'
  end

  namespace :redcase do
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
