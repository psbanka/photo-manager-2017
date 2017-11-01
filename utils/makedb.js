/* eslint-disable no-console */

const faker = require('faker')
const md5 = require('blueimp-md5')
const fetch = require('node-fetch')
const avGen = require('avatar-generator')()

// import faker from 'faker'

const getGender = (rate) => {
  if (Math.random() < rate) return 'male'
  else return 'female'
}

const makeBody = async () => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const email = faker.internet.email()
  const streetAddress = faker.address.streetAddress()
  const city = faker.address.city()
  const state = faker.address.state()
  const country = faker.address.country()
  const zipCode = faker.address.zipCode()
  const passwordHash = md5(faker.internet.password())
  const gender = getGender(0.5)

  const getAvatar = new Promise((resolve, reject) => {
    avGen(firstName, gender, 400).toBuffer((err, buffer) => {
      if (err) reject(new Error('cant get img, idk why', err))
      // when the buffer is finished convert to str and return/resolve
      resolve(`data:image/png;base64,${buffer.toString('base64')}`)
    })
  })
  const avatar = await getAvatar.then(resp => resp).catch(console.log)

  return {
    firstName,
    lastName,
    email,
    streetAddress,
    city,
    state,
    country,
    zipCode,
    passwordHash,
    avatar
  }
}

const createUsers = async () => {
  await fetch('https://test1234-2e32a.firebaseio.com/thing.json', {method: 'DELETE'})

  for (let i = 0; i < 100; i++) {
    const myInit = {
      method: 'POST',
      body: JSON.stringify(await makeBody())
    }

    const response = await fetch('https://test1234-2e32a.firebaseio.com/thing.json', myInit)
    const output = await response.json()
    console.log(output)
  }
}

createUsers()
  .then(console.log)
