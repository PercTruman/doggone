class SightingSerializer 
  include JSONAPI::Serializer
  attributes :id, :latitude, :longitude, :created_at, :finder_id,  :contact_method

  belongs_to :lost_dog
  belongs_to :user
end
