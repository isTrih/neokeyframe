module.exports = {
  apps: [
    {
      name: 'NeoKeyframe',
      port: '3000',
      exec_mode: 'cluster',
      instances: '4',
      watch: true,
      script: './.output/server/index.mjs'
    }
  ]
};
