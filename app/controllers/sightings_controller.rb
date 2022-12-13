class SightingsController < ApplicationController
 
    def create
        @sighting = Sighting.create!(sightings_params)
        render json: @sighting, status: :created 
    end

    private
        def sightings_params
            params.permit(:lost_dog_id, :owner_id, :finder_id, :map_lat, :map_lng)
        end
end
