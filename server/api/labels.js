import express from 'express'
import {queries, commands} from '../database'
const router = new express.Router()

router.get('/:boardId',(request, response, next) => {
  queries.getLabelsByBoardId (request.params.boardId).then(labels => {
    response.json(labels)
  }).catch(next)
})

export default router
