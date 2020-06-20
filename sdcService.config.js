module.exports = {
  apps : [{
    name        : "sdc-service-api",
    script      : "./server/index.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
     "NODE_ENV": "production"
    }
  },
  {
    name       : "sdc-service-client",
    script     : "webpack -d --watch",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
      "NODE_ENV": "production"
    }
  }]
};