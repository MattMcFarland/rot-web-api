## Dungeon generator server

A self-hosted dungeon generation server!

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Table of Contents

* [How it works](/#how-it-works) 
* [API](/#API) 
  * [API Documentation](http://docs.roguelike.apiary.io/#)
* [Server Setup](/#server-setup)
* [Examples](/#examples)
* [Acknowledgements](/#acknowledgements)

## How it works

This server comes with a sample index.html that shows when you send a GET request to the server, it responds with a new map in kind.  This allows you to fully decouple the dungeon generation into a microservice, so that the game can be written in any language that can send HTTP requests and read JSON. Thus, the responsibility for dungeon generation itself is offloaded completely.  

## API

Should you send a GET request to the server, you will receive JSON data. Here are the available GET request methods.  The [API documentation](http://docs.roguelike.apiary.io/#) is available on apiary.

## Server setup

The API server runs on node-js, and has been engineered to be a microservice and run in the cloud.  The easiest way to get your own server up and running is to [deploy with heroku](https://heroku.com/deploy) (which is no cost to you) , this way you dont need to setup your own server or install nodejs.  

### Test environment

To run on your own system, you need [Node.js](https://nodejs.org) **v7.x** installed.  From there, you can run your own version by cloning this repo, then running npm install/start.

```
git clone https://github.com/MattMcFarland/rot-web-api.git
cd rot-web-api
npm install
npm start
```

Your server should then be running on localhost:8080, from which you can use the REST API end points.

## Examples

When server is running, you can navigate to the root url to see a very basic example of API usage.

You can also find more API examples on apiary.

## Acknowledgements

This would not be possible without the hard work and tireless from the contribitors to the following projects:

* [ROT-JS](https://github.com/ondras/rot.js/) provides the algorithms for creating the dungeons, authored by Ondrej Zara 
* [Merry](https://github.com/shipharbor/merry) provides the RESTful API service, authored by Yoshua Wuyts
* [NodeJS](http://nodejs.org) provides the run-time environment, authored by many.
* [NPM](http://npmjs.com), the package manager for nodejs, authored by many

## LICENSE

[MIT](./LICENSE)
