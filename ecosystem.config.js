module.exports = {
  apps : [{
    name: "TICKET_MAHAL_WEBSITE",
    script: "npm",
    args: "start",
    cwd: "./",
    watch: true,
    env: {
      NODE_ENV: "live",
    }
  }]
};