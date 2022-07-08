const db = require('../DB/DBconnection');



// Fetch services

//  fetch catering services
const fetchCateringServices = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5
        const skip = (page - 1) * limit;
        const [data] = await db.execute(`select * from single_services where type = 'catering' limit ${limit} offset ${skip}`)

        res.status(501).json(data)

    } catch (error) {

        res.status(500).json(error);

    }

}

//  fetch video & Photography
const fetchVideoPhotographyServices = async (req, res) => {

    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5
        const skip = (page - 1) * limit;
        const [data] = await db.execute(`select * from single_services where type = 'Video & Photography' limit ${limit} offset ${skip}`)

        res.status(501).json(data)

    } catch (error) {

        res.status(500).json(error);

    }

}

//  fetch designer services
const fetchMakeupAndStylistServices = async (req, res) => {

    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5
        const skip = (page - 1) * limit;
        const [data] = await db.execute(`select * from single_services where type = 'Makeup Stylist' limit ${limit} offset ${skip}`)

        res.status(501).json(data)

    } catch (error) {

        res.status(500).json(error);

    }

}

// fetch Decorator services
const fetchDecorationAndLigntingServices = async (req, res) => {

    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5
        const skip = (page - 1) * limit;
        const [data] = await db.execute(`select * from single_services where type = 'Decoration & Lighting' limit ${limit} offset ${skip}`)
        res.status(501).json(data)

    } catch (error) {

        res.status(500).json(error);

    }

}

// fetch lighting services

const fetchMusicAndDJServices = async (req, res) => {

    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5
        const skip = (page - 1) * limit;
        const [data] = await db.execute(`select * from single_services where type = 'Music & DJ' limit ${limit} offset ${skip}`)

        res.status(501).json(data)

    } catch (error) {

        res.status(500).json(error);

    }

}

module.exports = { fetchCateringServices, fetchMusicAndDJServices, fetchDecorationAndLigntingServices, fetchVideoPhotographyServices, fetchMakeupAndStylistServices }