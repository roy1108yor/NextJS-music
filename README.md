
测试数据

npx prisma migrate dev


nix-env -iA nixpkgs.mysql80
mysql -u root -p -h 30.0.6.219 -P 33151

nix-env -iA nixpkgs.postgrey
psql -h 30.0.7.151 -p 32802 -U postgres -d verceldb

nix-env -iA nixpkgs.redis
redis-cli -h 30.0.6.219 -p 33150

nix-env -iA nixpkgs.mongosh
mongosh mongodb://30.0.2.137:33046
