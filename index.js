// BACKEND
const PORT = 3000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express() // calling express and calling it app
const cors = require('cors')
app.use(cors())

const url = 'https://www.aljazeera.com/' // website used for scraping

app.get('/', function (req, res) { // routing
    res.json('This is my webscraper')
})

app.get('/results', (req, res) => {
    axios(url) // use axios to make a http request from the url
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html) // use cheerio to scrape the tags specified
            const articles = [] // array to store scraped data

            // function that looks for title name and gets the text and the a href text
            $('.fte-article__title', html).each(function () { 
                const title = $(this).text()
                const url = $(this).find('a').attr('href')
                articles.push({ // pushes title and url into articles db array
                    title, url
                })
            })
            res.json(articles) // responds by sending the articles to browser
        }).catch(err => console.log(err)) // catches any errors 

})

// listen for PORT and tells you if it is running
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))