const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashBoard');

router.use('/users', userRoutes);
 router.use('/profile', dashboardRoutes);

module.exports = router;
