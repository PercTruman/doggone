class LostDogSerializer
  include JSONAPI::Serializer

  attributes :id, :breed, :color, :sex, :age_group, :image_url, :sightings
  # has_many :sightings

end
