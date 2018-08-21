const {
    MemcachedCache
} = require('apollo-server-cache-memcached');
const WeatherAPI = require('./dataSource')
const {
    ApolloServer
} = require('apollo-server-express')
const express = require('express')
const http = require('http')
const fs = require('fs')
const app = express()
const typeDefs = fs.readFileSync('./typeDefs.graphql', 'UTF-8')
const resolvers = require('./resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: new MemcachedCache('localhost:11211', {
        retries: 1,
        retry: 1
    }),
    dataSources: () => {
        return {
            weatherAPI: new WeatherAPI()
        }
    },
    persistedQueries: {
        cache: new MemcachedCache('localhost:11211', {
            retries: 1,
            retry: 1
        })
    }
})

server.applyMiddleware({
    app
})

app.get('/', (req, res) => {
    res.send('Hello plasma018 World\n')
})

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({
        port: 7000
    }, () =>
    console.log(`GraphQL Server running at http://localhost:4000${server.graphqlPath}`)
)

