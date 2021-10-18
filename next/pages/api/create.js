// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fetch from "node-fetch";

export default function handler(req, res) {

  const params = new URLSearchParams();
  params.append('player1', req.body.player1);
  params.append('player2', req.body.player2);

  fetch(process.env.wsProtocol + '://' + process.env.wsHost[process.env.wsType] + process.env.wsEndpoint, {
    method: 'post',
    body: params,
  })
      .then(r => r.json())
      .then(j => res.send(j))
}
