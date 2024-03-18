const router = require('express').Router({ mergeParams: true })
const { param, body } = require('express-validator')
const tokenHandler = require('../handlers/validation')
const validation = require('../handlers/validation')
const cardController = require('../controllers/card')

router.post(
  '/',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  body('sectionId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid section id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  cardController.create
)

router.put(
  '/update-position',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  cardController.updatePosition
)

router.delete(
  '/:cardId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  param('cardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid card id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  cardController.delete
)

router.put(
  '/:cardId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  param('cardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid card id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  cardController.update
)

module.exports = router