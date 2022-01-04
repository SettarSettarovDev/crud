const Router = require('express');
const router = new Router();
const {
  createProfile,
  getAllProfiles,
  getOneProfile,
  updateProfile,
  deleteProfile,
  deleteProfiles,
} = require('../controllers/profileController');

router.post('/', createProfile);
router.get('/', getAllProfiles);
router.get('/:profileId', getOneProfile);
router.put('/:profileId', updateProfile);
router.delete('/:profileId', deleteProfile);
router.delete('/deleteprofiles/:profileForUser', deleteProfiles);

module.exports = router;
