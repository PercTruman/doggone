class User < ApplicationRecord
    has_secure_password
    has_many :sightings
    has_many :lost_dogs, through: :sightings

    geocoded_by :address
    after_validation :geocode
end
