class SightingsController < ApplicationController
    skip_before_action :authenticate_user, only: :create
  

    def index
        sightings = Sighting.all
        render json: sightings, status: :created
    end



    def local_sightings
        local_sightings = Sighting.near(@current_user[:latitude, :longitude], 0.01 )
        render json: local_sightings
    end

    def create
        @sighting = Sighting.create!(sightings_params)
        render json: @sighting, status: :created 
    end

   

    private
        def sightings_params
            params.permit( :user_id, :lost_dog_id, :owner_id, :finder_id, :latitude, :longitude,:additional_details, :contact_method)
        end
end
