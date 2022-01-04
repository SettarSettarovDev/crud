const { Profile } = require('../models/models');
const ApiError = require('../error/ApiError');

const ProfileController = {
  async createProfile(req, res, next) {
    try {
      const {
        profileName,
        profileGender,
        profileBirthday,
        profileCity,
        profileForUser,
      } = req.body;
      const profile = await Profile.create({
        profileName,
        profileGender,
        profileBirthday,
        profileCity,
        profileForUser,
      });
      return res.json(profile);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  },
  async updateProfile(req, res) {
    try {
      const { profileName, profileGender, profileBirthday, profileCity } =
        req.body;
      const { profileId } = req.params;
      await Profile.update(
        {
          profileName,
          profileGender,
          profileBirthday,
          profileCity,
        },
        { where: { profileId } }
      );
      const profile = await Profile.findOne({ where: { profileId } });
      return res.json(profile);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  },

  async deleteProfile(req, res) {
    try {
      const { profileId } = req.params;
      const profile = await Profile.destroy({ where: { profileId } });
      return res.json(profile);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  },

  async deleteProfiles(req, res) {
    try {
      const { profileForUser } = req.params;
      const profile = await Profile.destroy({ where: { profileForUser } });
      return res.json(profile);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  },

  async getAllProfiles(req, res) {
    try {
      const profiles = await Profile.findAll();
      return res.json(profiles);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  },

  async getOneProfile(req, res) {
    try {
      const { profileId } = req.params;
      const profile = await Profile.findOne({ where: { profileId } });
      return res.json(profile);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  },
};

module.exports = ProfileController;
