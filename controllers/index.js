const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require('./home-routes');
const appointmentRoutes = require('./appointment-routes');

router.use("/api", apiRoutes);
router.use('/', homeRoutes);
router.use('/appointment', appointmentRoutes);


router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
