class SightingsController < ApplicationController
    skip_before_action :authenticate_user, only: :create
    belongs_to :lost_dog

    def index
        local_dogs = Sighting.near('Mansfield, TX, US',1 )
        render json: local_dogs
    end

    def create
        @sighting = Sighting.create!(sightings_params)
        render json: @sighting, status: :created 
    end

   

    private
        def sightings_params
            params.permit(:user_id, :lost_dog_id, :owner_id, :finder_id, :map_lat, :map_lng)
        end
end
