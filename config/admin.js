module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'be56bca3ff0e8efd0194c3af162d2801'),
  },
});
