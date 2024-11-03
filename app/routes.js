//import {sendApplication} from '/clients/applicationsApiClient.js';
const { sendApplication } = require('./clients/applicationsApiClient.js')
//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
router.post('/layouts/eligibility/on-street-parking', function (req, res) {

  // Check whether the variable matches a condition
  if (true == true) {
    // Send user to next page
    res.redirect('/layouts/eligibility/check-vrn')
  }
})

router.post('/layouts/eligibility/check-vrn', function (req, res) {

  // Check whether the variable matches a condition
  if (true == true) {
    // Send user to next page
    res.redirect('/layouts/eligibility/check-address')
  }
})

router.post('/layouts/eligibility/check-address', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var onStreetParking = req.session.data['on-street-parking']
  console.log(req.session.data)
  console.log(onStreetParking)

  // Check whether the variable matches a condition
  if (onStreetParking == "yes") {
    // Send user to next page
    res.redirect('/layouts/apply/guidance')
  } else {
    res.redirect('/layouts/not-eligible')
  }
})

router.post('/layouts/apply/guidance', function (req, res) {
  res.redirect('/layouts/apply/contact-details')
})

router.post('/layouts/apply/contact-details', function (req, res) {

  var changeAnswer = req.session.data['change-answer']
  console.log(req.session.data)
  console.log(changeAnswer)
  req.session.data['change-answer'] = 'false'
  console.log(req.session.data)
  console.log(changeAnswer)

  if (changeAnswer == "true") {
    res.redirect('/layouts/check-your-answers')
  } else {
    res.redirect('/layouts/apply/address')
  }
})

router.post('/layouts/apply/address', function (req, res) {

  var changeAnswer = req.session.data['change-answer']
  req.session.data['change-answer'] = 'false'

  if (changeAnswer == "true") {
    res.redirect('/layouts/check-your-answers')
  } else {
    res.redirect('/layouts/apply/vrn')
  }
})

router.post('/layouts/apply/vrn', function (req, res) {

  var changeAnswer = req.session.data['change-answer']
  req.session.data['change-answer'] = 'false'

  res.redirect('/layouts/check-your-answers')
})

router.post('/layouts/check-your-answers', function (req, res) {
  var answers = req.session.data
  console.log(answers)

  const formData = {
    "Name": answers["full-name"],
    "EmailAddress": answers["email-address"],
    "AddressLine1": "Address line 1",
    "AddressLine2": "Address line 2",
    "City": "City",
    "County": "County",
    "Postcode": answers["address-postcode"],
    "Vrn": answers["vrn"]
  }
  sendApplication(formData);


  res.redirect('/layouts/confirmation')
})