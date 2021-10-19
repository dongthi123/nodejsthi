const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { thiiService } = require('../services');

const createThii = catchAsync(async (req, res) => {
  const thii = await thiiService.createThii(req.body);
  res.status(httpStatus.CREATED).send(thii);
});

const getThiis = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await thiiService.queryThiis(filter, options);
  res.send(result);
});

const getThii = catchAsync(async (req, res) => {
  const thii = await thiiService.getThiiById(req.params.thiiId);
  if (!thii) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Thii not found');
  }
  res.send(thii);
});

const updateThii = catchAsync(async (req, res) => {
  const thii = await thiiService.updateThiiById(req.params.thiiId, req.body);
  res.send(thii);
});

const deleteThii = catchAsync(async (req, res) => {
  await thiiService.deleteThiiById(req.params.thiiId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createThii,
  getThiis,
  getThii,
  updateThii,
  deleteThii,
};
