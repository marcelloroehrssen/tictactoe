module.exports = {
  env: {
    wsProtocol: "http",
    wsHost: {
      php: "web:80",
      node: "node:3000"
    },
    wsEndpoint: "/game",
    wsType: "node"
  },
  reactStrictMode: true,
}
