module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/provinces",
        permanent: false,
      },
    ];
  },
};
