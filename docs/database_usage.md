# Database Usage Documentation

## Overview
This document outlines the usage instructions for various databases used in this project, including installation and access details for MySQL, PostgreSQL, Redis, and MongoDB, as well as test data and commands as outlined in the `README.md`.

## Installation and Access Instructions

### MySQL
1. Install MySQL 8.0 using Nix:
   ```
   nix-env -iA nixpkgs.mysql80
   ```
2. Access MySQL:
   ```
   mysql -u root -p -h 30.0.6.219 -P 33151
   ```

### PostgreSQL
1. Install PostgreSQL using Nix:
   ```
   nix-env -iA nixpkgs.postgrey
   ```
2. Access PostgreSQL:
   ```
   psql -h 30.0.7.151 -p 32802 -U postgres -d verceldb
   ```

### Redis
1. Install Redis using Nix:
   ```
   nix-env -iA nixpkgs.redis
   ```
2. Access Redis:
   ```
   redis-cli -h 30.0.6.219 -p 33150
   ```

### MongoDB
1. Install MongoDB shell using Nix:
   ```
   nix-env -iA nixpkgs.mongosh
   ```
2. Access MongoDB:
   ```
   mongosh mongodb://30.0.2.137:33046
   ```

## Test Data and Commands

### Command to Setup Database
To set up the database with Prisma, run:
```
npx prisma migrate dev
```

### Summary of Test Data 
The test data includes several commands for database setup and access, as referenced in the `README.md`. Ensure that your environment variables are correctly set for your database URL.

### Additional Information
- Make sure to run the necessary migrations to set up the database schema as defined in the Prisma schema file.
- For more detailed information on each database, refer to the respective documentation and tools specific to each database system.

This documentation serves as a quick reference for developers working on this project.