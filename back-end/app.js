import dotenv from 'dotenv';
dotenv.config();

import fetch from 'node-fetch';

import express from 'express';
const app = express();
import bodyParser from 'body-parser';
let PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.get('/ping', (req, res) => {
    res
    .status(200)
    .send("pong")
})

app.get('/list-user-groups', (req, res) => {
    const baseUrl = "https://slack.com/api/usergroups.list";
    const reqUrl = `${baseUrl}?token=${process.env.U_TOKEN}&include_count=true`;


    const requestData = {
        token: process.env.SECRET,
    }

    fetch(reqUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlenconded'
        }
    })
    .then((response) => {
        if (response.ok) {
            // console.log('In first then')
            return response.json()
        } else {
            // console.log(`I'm not ok (in first then)`)
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    })
    .then(json => {
        // console.log(`in second then`)
        // console.log(json)
        res.send(json);
    })
    .catch(error => {
        // console.log('Been caught')
        res.status = error.statusCode;
        console.log(error)
    })
})

// Route for getting info from a particular user group:
app.get('/list-group-users/:group', (req, res) => {
    const baseUrl = 'https://slack.com/api/usergroups.users.list';
    const reqUrl = `${baseUrl}?token=${process.env.U_TOKEN}&usergroup=${req.params.group}`;

    fetch(reqUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlenconded'
        }
    })
    .then(response => {
      // res.send(response)
      // console.log(response.ok)
      // console.log('=====================================================')
      // console.log(response)
        // if (response.error) {
        //   let error = new Error(response.statusText);
        //   error.response = response;
        //   throw error;
        // }
        // else {
          return response.json();
        // }
    })
    .then(json => {
      // console.log('in then ', json)
      if (!json.ok) {
        let error = new Error(json.error)
        throw error;
      }
      res.send(json)
    })
    .catch(error => {
      console.log('error caught')
      console.error(error)
      res.status(404).send('Group not found')
    })
})

module.exports = app;
