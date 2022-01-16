const Router = require('express');
const router = new Router();
const {
  createProfile,
  getAllProfiles,
  updateProfile,
  deleteProfile,
  deleteProfiles,
} = require('../controllers/profileController');

router.post('/', createProfile);
router.get('/', getAllProfiles);
router.put('/:profileId', updateProfile);
router.delete('/:profileId', deleteProfile);
router.delete('/deleteprofiles/:profileForUser', deleteProfiles);

module.exports = router;
