const _ = require('lodash')
const Bluebird = require('bluebird')
const cheerio = require('cheerio')
const axios = require('axios')
const lowdb = require('../resources/lowdb')
const snapshot = require('../resources/snapshot')

const MP_HOST = 'https://mp.weixin.qq.com'

const CONCURRENCY = 5

const mp = axios.create({
  baseURL: MP_HOST,
  responseType: 'text',
})

async function clone() {
  let response = await mp.get(`/debug/wxadoc/dev/api/`)

  await snapshot.save('index.html', response.data)

  let $ = cheerio.load(response.data)

  let urls = $('.summary a')
    .map(function() {
      return $(this).attr('href')
    })
    .get()

  urls = _.chain(urls)
    // strip sharp
    .map(link => link.replace(/^(.*?)#(.*)$/, '$1'))
    .uniq()
    .value()

  return await Bluebird.map(
    urls,
    url =>
      Bluebird.resolve()
        .then(() => mp.get(`/debug/wxadoc/dev/api/${url}`))
        .then(response => ({ url, html: response.data }))
        .tap(({ html }) => snapshot.save(url, html)),
    { concurrency: 5 }
  )
}

function parse(html) {
  let $ = cheerio.load(html)

  let titles = $('h3')
    .map(function() {
      return $(this).text()
    })
    .get()

  titles = _.chain(titles)
    .filter(title => /^wx\./.test(title))
    .uniq()
    .value()

  return titles
}

module.exports = async function main() {
  let pages = await clone()
  let apis = _.chain(pages)
    .map(({ html }) => parse(html))
    .flatten()
    .uniq()
    .value()
  lowdb.set('wxapi.apis', apis).write()
  console.log(apis)
}
