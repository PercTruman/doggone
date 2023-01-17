class User < ApplicationRecord
    has_secure_password
    has_many :posts
    has_many :sightings
    has_many :lost_dogs, through: :sightings

    geocoded_by :address
    after_validation :geocode

    validates :username, presence: true, uniqueness: true
    validates :email,  format: { with: /(.+)@(.+)/, message: "Email invalid"  },
                uniqueness: { case_sensitive: false },
                length: { minimum: 4, maximum: 254 }
    validates :password, presence: true
    validates :address, presence: true
end
