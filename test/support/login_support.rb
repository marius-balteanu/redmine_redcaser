module LoginSupport
  private

  def login_as(user)
    @request.session[:user_id] = user.id
  end
end
