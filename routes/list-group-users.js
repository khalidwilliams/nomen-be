import dotenv from 'dotenv';
dotenv.config();

import fetch from 'node-fetch';

/*
  THIS VERSION OF THE FILE IS NO LONGER BEING USED -- NOW EVERYTHING IS TESTED FROM APP.JS 
*/

const listGroupUsers = (req, res) => {
    const baseUrl = 'https://slack.com/api/usergroups.users.list';
    const reqUrl = `${baseUrl}?token=${process.env.U_TOKEN}&usergroup=${req.params.group}`;
    fetch(reqUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlenconded'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    })
    .then(json => {
        console.log(json)
    })
    .catch(error => {
        res.status = error.statusCode;
        console.log(error)
    })


}

module.exports = listGroupUsers;
