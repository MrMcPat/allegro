class User < ApplicationRecord
    has_many :alarms

    has_secure_password

    attr_accessor :old_password

    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true, length: {maximum: 20}
end
