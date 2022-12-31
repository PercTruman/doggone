class PostsController < ApplicationController
    skip_before_action :authenticate_user, only: :create

    def index
        @posts = Post.all
        render json: @posts
    end

    def create
        @post = Post.create!(post_params)
       render json: @post
    end

    def update
    end

    def destroy
    end

    private

    def post_params
        params.permit(:subject, :content, :author_id, :user_id)
    end
end
