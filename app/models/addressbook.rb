class Addressbook < ApplicationRecord
    validates :name, presence: true
    validates :age, presence: true
    validates :mobile, presence: true
    validates :gender, presence: true
    validates :address, presence: true
end
