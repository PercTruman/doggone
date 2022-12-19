class UsersController < ApplicationController
  skip_before_action :authenticate_user, only: :create
      def index
          users = User.all
          render json: users
      end
  
      def create
          user = User.create!(user_params)
              session[:user_id] = user.id
              render json: user, status: :ok
      end
  
      def show
          if current_user
            render json: current_user, status: :ok
          else
            render json: {error:"Not authenticated"}, status: :unauthorized
          end
      end
  
      private
      def user_params
          params.permit(:address, :username, :email, :password, :password_confirmation)
      end
  end
  
