operation:
  installed software:
    - nodejs
    - npm
    - mysql or mariadb
  running:
    begin a mysql or mariadb server.
      if this is a fresh install, set the root password to CPSC471, otherwise the password will have to be passed in.
    open a terminal, cd into the project backend directory, and run the following commands:
      npm install
      if the mysql/mariadb root password is not CPSC471, set the enviroment variable as follows for linux:
        export DB_PASSWORD=[mysql/mariadb root password]
          the host, user, and port may also be set via enviroment variables, however these should not need to be changed:
            export DB_HOST=[mysql/mariadb host]
            export DB_USER=[mysql/mariadb user]
            export DB_PORT=[mysql/mariadb port]
      node index.js 
    open a second terminal, cd into the project frontend directory, and run the following commands:
      npm install --force (currently has a version conflict however still runs fine)
      npm run dev  
