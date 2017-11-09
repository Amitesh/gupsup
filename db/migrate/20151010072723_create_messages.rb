class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :content

      # Status to keep track of message journey - like 
      # sent- reached to server => 0, 
      # received - reached to recipient => 1, 
      # read - read by recipient => 2, 
      # sending - initially => -1
      t.integer :status, default: 0 

      # Message origin type like
      # web => 0, mobile => 1, tablet => 2, ipad => 3, wearable => 4 
      t.integer :origin, default: 0 
      t.references :conversation, index: true
      t.references :user, index: true

      t.timestamps null: false
    end
  end
end
