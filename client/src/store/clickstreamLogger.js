import axios from "axios"
import { useEffect } from "react";

export default function (session, user, username, action, context) {
    var data = JSON.stringify({
    "sessionId": session,
    "userId": user,
    "username": username,
    "action": action,
    "context": context
    });

    var config = {
    method: 'post',
    url: 'https://i1pf4zqg3j.execute-api.ap-south-1.amazonaws.com/iitbClickstreamLog',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });
}