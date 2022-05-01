class CreateAlarms < ActiveRecord::Migration[6.1]
  def change
    create_table :alarms do |t|
      t.integer :user_id, null: false, foreign_key: true
      t.string :alarm_before
      t.string :alarm_after
      t.integer :increment
      t.string :alarm_name

      t.timestamps
    end
  end
end
