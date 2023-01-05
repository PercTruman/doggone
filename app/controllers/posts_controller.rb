class PostsController < ApplicationController
   

    def index
        @posts = Post.all
        render json: @posts
    end

    def create
        @post = Post.create!(post_params)
       render json: @post
    end


    def destroy
        post = Post.find(params[:id])
        post.destroy

        render json: {
            status: {code: 202, message: "Post successfully deleted"}
        }, status: :accepted
    end

    private

    def post_params
        params.permit(:subject, :content, :author, :user_id)
    end
end
