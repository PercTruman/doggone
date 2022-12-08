class LostDogsController < ApplicationController

    def index
        lost_dogs=LostDog.all.with_attached_image
        render json: lost_dogs, include: ['image'], status: :ok
    end

    def create
        lost_dog = LostDog.create!(lost_dog_params)
        render json: {
            image: image,
            status: {code:201, message: "Image created successfully!"}, status: :created }
    end

    def update
        lost_dog = lost_dog.find(params[:id])
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
        params.permit(:image, :color, :sex, :breed, :age_group, :additonal_details)
    end
end
