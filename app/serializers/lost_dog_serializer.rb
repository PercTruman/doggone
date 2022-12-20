class LostDogSerializer
  include JSONAPI::Serializer
  has_many :sightings
  attributes :id, :breed, :color, :sex, :age_group, :image_url

end
