require('dotenv').config();
const path = require('path');
const fs = require('fs');
const connectMongo = require('../config/db');

(async () => {
  await connectMongo();

  // === Run all Migrations ===
  const migrationPath = path.join(__dirname, '../migrations/mongo');
  const migrationFiles = fs.readdirSync(migrationPath).filter(file => file.endsWith('.js'));

  for (const file of migrationFiles) {
    const migration = require(path.join(migrationPath, file));
    if (typeof migration.up === 'function') {
      console.log(`🔄 Running migration: ${file}`);
      await migration.up();
    }
  }

  // === Run all Seeders ===
  const seederPath = path.join(__dirname, '../seeders/mongo');
  const seederFiles = fs.readdirSync(seederPath).filter(file => file.endsWith('.js'));

  for (const file of seederFiles) {
    const seeder = require(path.join(seederPath, file));
    if (typeof seeder.run === 'function') {
      console.log(`🌱 Running seeder: ${file}`);
      await seeder.run();
    }
  }

  console.log('✅ All migrations and seeding completed');
  process.exit();
})();
