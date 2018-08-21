const fetch = require('node-fetch')
const {
    PubSub
} = require('apollo-server-express')
let db = []
let people_db = []
const POST_ADDED = 'POST_ADDED';
const pubsub = new PubSub()


const Query = {
    HelloWorld: () => 'Hello World !',
    AllMessage: () => db,
    getLocation: () => fetch(`https://works.ioa.tw/weather/api/all.json`).then(res => res.json()),
    getWeather: (root, {
        id
    }, {
        dataSources
    }) => dataSources.weatherAPI.getWeather(id)
}

const Mutation = {
    PostMessage: (root, args) => {
        console.log(args.message)
        db.push(args.message)
        return 'YES'
    },
    AddPerson: (root, {
        input
    }) => {
        people_db.push(input)
        console.log(input)
        pubsub.publish(POST_ADDED, {
            postAdded: false,
            sendSecond: input
        })
        return input
    },
}

const Subscription = {
    postAdded: {
        subscribe: () => pubsub.asyncIterator([POST_ADDED]),
    },
    sendSecond: {
        subscribe: () => pubsub.asyncIterator([POST_ADDED])
    }
}

const Location = {
    towns: parent => fetch(`https://works.ioa.tw/weather/api/cates/${parent.id}.json`).then(res => res.json()).then(data => data.towns),
    getTown: (parent, {
        id
    }) => fetch(`https://works.ioa.tw/weather/api/towns/${id}.json`).then(res => res.json())
}

const Town = {
    position: parent => fetch(`https://works.ioa.tw/weather/api/towns/:${parent.id}.json`).then(res => res.json()).then(data => data.towns)
}

const Weather = {
    name: (parent, {
        id
    }) => fetch(`https://works.ioa.tw/weather/api/towns/${id}.json`).then(res => res.json()).then(data => data.name)
}

module.exports = {
    Query,
    Mutation,
    Location,
    Town,
    Weather,
    Subscription
}