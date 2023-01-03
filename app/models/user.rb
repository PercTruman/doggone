class User < ApplicationRecord
    has_secure_password
    has_many :posts
    has_many :sightings
    has_many :lost_dogs, through: :sightings

    geocoded_by :address
    after_validation :geocode

    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true
    validates :address, presence: true
end
