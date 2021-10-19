const httpStatus = require('http-status');
const { Thii } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a thii
 * @param {Object} thiiBody
 * @returns {Promise<Thii>}
 */
const createThii = async (thiiBody) => {
  return Thii.create(thiiBody);
};

/**
 * Query for thiis
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryThiis = async (filter, options) => {
  const thiis = await Thii.paginate(filter, options);
  return thiis;
};

/**
 * Get thii by id
 * @param {ObjectId} id
 * @returns {Promise<Thii>}
 */
const getThiiById = async (id) => {
  return Thii.findById(id);
};

/**
 * Get thii by email
 * @param {string} email
 * @returns {Promise<Thii>}
 */
const getThiiByEmail = async (email) => {
  return Thii.findOne({ email });
};

/**
 * Update thii by id
 * @param {ObjectId} thiiId
 * @param {Object} updateBody
 * @returns {Promise<Thii>}
 */
const updateThiiById = async (thiiId, updateBody) => {
  const thii = await getThiiById(thiiId);
  if (!thii) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Thii not found');
  }
  if (updateBody.email && (await Thii.isEmailTaken(updateBody.email, thiiId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(thii, updateBody);
  await thii.save();
  return thii;
};

/**
 * Delete thii by id
 * @param {ObjectId} thiiId
 * @returns {Promise<Thii>}
 */
const deleteThiiById = async (thiiId) => {
  const thii = await getThiiById(thiiId);
  if (!thii) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Thii not found');
  }
  await thii.remove();
  return thii;
};

module.exports = {
  createThii,
  queryThiis,
  getThiiById,
  getThiiByEmail,
  updateThiiById,
  deleteThiiById,
};
