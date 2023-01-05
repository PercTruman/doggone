class Post < ApplicationRecord
    belongs_to :user

    validates :content, presence: true, uniqueness: true, length: { maximum: 1000}
    validates :user_id, presence: true
    validates :author, presence: true
end
