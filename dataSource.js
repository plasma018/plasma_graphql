const {
    RESTDataSource
} = require('apollo-datasource-rest');

class WeatherAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://works.ioa.tw/weather/api/';
    }

    willSendRequest(request) {
        request.headers.set('Authorization', this.context.token);
    }

    async getAllLocation() {
        const data = await this.get(`all.json`);
        return data;
    }

    async getWeather(id) {
        const data = await this.get(`weathers/${id}.json`);
        return data
    }
}

module.exports = WeatherAPI