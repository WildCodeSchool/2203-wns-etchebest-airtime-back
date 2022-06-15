# Airtime server

  - [Overview](#overview)
    - [What's inside](#whats-inside)
    - [Requirements](#requirements)
    - [Installing](#installing)

## What's inside

## Requirements

To install the project you need the following packages : 
- Proper [NPM Setup](https://medium.com/@ExplosionPills/dont-use-sudo-with-npm-still-66e609f5f92) : npm v6 or higher versions
- node v16 or higher versions (can be [easily managed via n](https://github.com/tj/n))
- [docker](https://www.docker.com/) v20.10 or higher versions
- docker-compose v1.29 or higher versions
- [next.js](https://nextjs.org/) v9.3.2 or higher versions

## Installing

### Clone the repository "back" and "front" in the same directory

Availables at :
- https://github.com/WildCodeSchool/2203-wns-etchebest-airtime-front
- https://github.com/WildCodeSchool/2203-wns-etchebest-airtime-back

### Database
Setup a .env file with your SQL database credentials
Run the script.sql file to create the database (./2203-wns-etchebest-airtime-back/database/).

### Docker
To launch the project run this command : 
```bash
docker compose -f docker-compose.yml up --build 
```