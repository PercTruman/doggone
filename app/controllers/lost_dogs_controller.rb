class LostDogsController < ApplicationController
    skip_before_action :authenticate_user, only: :create
   

    def index
        lost_dogs=LostDog.all
        render json: LostDogSerializer.new(lost_dogs), status: :ok
    end
    
   def show
    @lost_dog= LostDog.find(params[:id])
    render json: LostDogSerializer.new(@lost_dog).serializable_hash[:data][:attributes], status: :created
   end

    def create
        byebug
        @lost_dog = LostDog.create!(lost_dog_params)
        render json: LostDogSerializer.new(@lost_dog).serializable_hash[:data][:attributes], status: :created 
      
    end



    def update
        lost_dog = LostDog.find(params[:id])
        to_delete = params[:image_to_delete]
        lost_dog.update(lost_dog_params)

        if to_delete
            image_id = to_delete.split(",").map(&:to_i)
            image_id.map do |id|
                image = lost_dog.image.find(id)
                image.purge_later
            end
        end
        render json: {
            lost_dog: lost_dog, status: {code: 202, message: "Image successfully updated"}
        }, status: :accepted
    end

    def destroy
        lost_dog = LostDog.find(params[:id])
        lost_dog.destroy

        render json: {
            status: {code: 202, message: "Receipt successfully deleted"}
        }, status: :accepted
    end

    def image
        return unless object.image.attached?
        object.image.blob.attributes.slice('filename', 'id').merge(url: image_url(object.image))
    end

    def image_url
        rails_blob_path(image, only_path: true)
    end

    private

    def lost_dog_params
        params.permit(:image, :color, :sex, :breed, :age_group)
    end
end
