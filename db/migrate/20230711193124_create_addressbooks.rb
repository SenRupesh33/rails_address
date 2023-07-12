class CreateAddressbooks < ActiveRecord::Migration[7.0]
  def change
    create_table :addressbooks do |t|
      t.string :name
      t.integer :age
      t.string :mobile
      t.string :gender
      t.string :address

      t.timestamps
    end
  end
end
