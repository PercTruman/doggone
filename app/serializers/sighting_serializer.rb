class SightingSerializer
  include JSONAPI::Serializer
  attributes :id, :latitude, :longitude, :created_at, :finder_id

  belongs_to :lost_dog
  belongs_to :user
end
