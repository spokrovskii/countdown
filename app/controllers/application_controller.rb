class ApplicationController < ActionController::Base
    # Prevent CSRF attacks by raising an exception.
    # For APIs, you may want to use :null_session instead.
    protect_from_forgery with: :exception

    before_filter :configure_permitted_parameters, if: :devise_controller?

    def user_is_logged_in?
      if !session[:oktastate]
        print("this is not logged in")
        redirect_to user_oktaoauth_omniauth_authorize_path
      end
    end
  
    def after_sign_in_path_for(resource)
      request.env['omniauth.origin'] || root_path
    end 

    protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [
                                                          { roles: [] },
                                                          :first_name,
                                                          :last_name,
                                                          :email,
                                                          :current_password,
                                                          :password,
                                                          :password_confirmation
                                                        ])
    end

    def check_permissions
      item = model.find(params[:id])

      if !current_user || !current_user.can_modify?(item)
        flash[:alert] = 'You do not have permission to complete that action.'
        redirect_to root_path
      end
    end
    private

    def model
      self.class.name.sub("Controller", "").singularize.constantize
    end
  end
