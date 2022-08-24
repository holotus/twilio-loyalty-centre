// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


// require('dotenv').config();
import * as sgMail from '@sendgrid/mail'
import Analytics from 'analytics-node'
// const sgMail = require('@sendgrid/mail');
// const sgClient = require('@sendgrid/client');
// const Analytics = require('analytics-node');

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
// sgClient.setApiKey(process.env.SENDGRID_API_KEY);
var analytics = new Analytics(process.env.SEGMENT_WRITE_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    // await new Promise(r => setTimeout(r, 2000));

    const confNum = randNum();
    
    const params = new URLSearchParams({
        conf_num: confNum.toString(),
        email: req.body.email
    });

    const confirmationURL = process.env.API_BASE_URL + 'confirm/?' + params;

    const msg = {
        to: req.body.email,
        from: 'hello@twi-lio.com',
        subject: `Confirm your subscription to our newsletter`,
        html: `Hello ${req.body.name},<br>Thank you for subscribing to our newsletter. Please complete and confirm your subscription by <a href="${confirmationURL}"> clicking here</a>.`
    }

    let traits = {
        name: req.body.name,
        // lastName: req.body.lastname,
        email: req.body.email,
        // phone: req.body.phone,
        // contactPreference: req.body.contactpreference,
        // referrer: req.body.referrer,
        confNum: confNum,
        createdAt: new Date()
    }

    // Push to Segment Personas
    await pushContact(req.body.email, traits);

    await pushEvent(req.body.email, 'Sign Up', {
        createdAt: new Date(),
        source: 'Transform Web App',
    });

    // Push Referral Event
    if (req.body.referrer && req.body.referrer != '') {
        await pushEvent(req.body.referrer, 'Referred a Friend', {
            createdAt: new Date(),
            referral: req.body.email,
            source: 'Transform Web App'
        });
    }

    await sgMail.send(msg);
    // res.render('message', { message: 'Thank you for signing up for our newsletter! Please complete the process by confirming the subscription in your email inbox.' });

    res.status(200).json({ 
        email: req.body.email,
        // isSignup: req.body.isSignup
    })

}



/*
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const sgClient = require('@sendgrid/client');
const Analytics = require('analytics-node');
const express = require('express')
const app = express();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgClient.setApiKey(process.env.SENDGRID_API_KEY);
// var analytics = new Analytics(process.env.SEGMENT_WRITE_KEY);

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.set('view engine', 'ejs');

app.listen(3000, () => { // Tells the app to start on port 3000. This function below is run when
    console.log("Server listening on port 3000!"); // Say in the console "Server listening on port 3000!"
})

app.get('/', (req, res) => {
    res.render('signup', signUpPage);
});

const signUpPage = {
    title: 'Join Our Newsletter',
    subtitle: 'Subscribe to our newsletter to receive the latest news and products.',
};

app.post('/signup', async (req, res) => {

    const confNum = randNum();
    const params = new URLSearchParams({
        conf_num: confNum,
        email: req.body.email,
    });

    const confirmationURL = req.protocol + '://' + req.headers.host + '/confirm/?' + params;

    const msg = {
        to: req.body.email,
        from: 'hello@twi-lio.com',
        subject: `Confirm your subscription to our newsletter`,
        html: `Hello ${req.body.firstname},<br>Thank you for subscribing to our newsletter. Please complete and confirm your subscription by <a href="${confirmationURL}"> clicking here</a>.`
    }

    let traits = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        contactPreference: req.body.contactpreference,
        referrer: req.body.referrer,
        confNum: confNum,
        createdAt: new Date()
    }

    // Push to Segment Personas
    await pushContact(req.body.email, traits);

    await pushEvent(req.body.email, 'Sign Up', {
        createdAt: new Date(),
        source: 'Transform Web App',
    });

    // Push Referral Event
    if (req.body.referrer != '') {
        await pushEvent(req.body.referrer, 'Referred a Friend', {
            createdAt: new Date(),
            referral: req.body.email,
            source: 'Transform Web App'
        });
    }

    await sgMail.send(msg);
    res.render('message', { message: 'Thank you for signing up for our newsletter! Please complete the process by confirming the subscription in your email inbox.' });
});

*/

function randNum() {
    return Math.floor(Math.random() * 90000) + 10000;
}

async function pushContact(userId:string, traits:any) {
    analytics.identify({
        userId: userId,
        traits: traits
    });
}

async function pushEvent(userId:string, event:string, properties:any) {
    analytics.track({
        userId: userId,
        event: event,
        properties: properties
    });
}
