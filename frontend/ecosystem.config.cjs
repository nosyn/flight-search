/* eslint-disable no-undef */
module.exports = {
  apps: [
    {
      name: 'Flight Search',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: 'dist',
        PM2_SERVE_PORT: 5173,
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: '/index.html',
      },
    },
  ],
};
