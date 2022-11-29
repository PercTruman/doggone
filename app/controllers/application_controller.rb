class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authenticate_user

rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  private
  def current_user
    @current_user ||= User.find_by_id(session[:user_id])
  end

  def authenticate_user
    render json: {errors: "Not Authorized"}, status: :unauthorized unless current_user 
  end

  def render_not_found(error)
    render json: {errors: {error.model => "Not Found"}}, status: :not_found 
  end

  def render_unprocessable_entity(invalid)
    render json: {errors: invalid.record.errors}, status: :unprocessable_entity
  end
end
