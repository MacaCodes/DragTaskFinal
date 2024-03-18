const router = require('express').Router({ mergeParams: true })
const { param } = require('express-validator')
const tokenHandler = require('../handlers/validation')
const columnController = require('../controllers/column')
const validation = require('../handlers/validation')

router.post(
  '/',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  columnController.create
)

router.put(
  '/:columnId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  param('columnId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid column id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  columnController.update
)

router.delete(
  '/:columnId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  param('columnId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid column id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  columnController.delete
)

module.exports = router