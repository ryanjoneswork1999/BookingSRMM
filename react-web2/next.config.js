module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/UserBookings',
        permanent: true,
      },
    ]
  },
}