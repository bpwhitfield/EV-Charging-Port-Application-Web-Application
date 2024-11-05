//import {sendApplication} from '/clients/applicationsApiClient.js';
const { sendApplication } = require('./clients/applicationsApiClient.js')
//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const express = require("express");
const { body, validationResult } = require("express-validator");

// Express.js middleware to use JSON objects
router.use(express.json());

// Add your routes here
router.post('/layouts/eligibility/on-street-parking',
  [
    [
      body('on-street-parking').notEmpty(),
    ]
  ],
  function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('/layouts/eligibility/on-street-parking', { errors: errors.array() });
    }
    res.redirect('/layouts/eligibility/check-vrn')
  })

router.post('/layouts/eligibility/check-vrn',
  [
    [
      body('vrn-check').notEmpty(),
    ]
  ],
  function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('/layouts/eligibility/check-vrn', { errors: errors.array() });
    }
    res.redirect('/layouts/eligibility/check-address')

  })

router.post('/layouts/eligibility/check-address', function (req, res) {

  var onStreetParking = req.session.data['on-street-parking']
  console.log(req.session.data)
  console.log(onStreetParking)

  if (onStreetParking == "yes") {
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