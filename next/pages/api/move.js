// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fetch from "node-fetch";

export default function handler(req, res) {

  const params = new URLSearchParams();
  params.append('move', req.body.move);

  fetch(process.env.wsProtocol + '://' + process.env.wsHost[process.env.wsType] + process.env.wsEndpoint + '/' + req.body.id, {
    method: 'put',
    body: params,
  })
      .then(r => r.json())
      .then(j => res.send(j))
}
