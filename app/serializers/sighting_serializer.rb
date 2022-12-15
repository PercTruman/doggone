class SightingSerializer
  include JSONAPI::Serializer
  attributes :id, :map_lat, :map_lng, :created_at, :finder_id
end
