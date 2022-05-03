class Alarm < ApplicationRecord
    belongs_to :user
    has_many :time_changes

    validates :increment, numericality: {less_than_or_equal_to: 20, greater_than: 0}
end
