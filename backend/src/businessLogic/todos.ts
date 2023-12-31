import { TodosAccess } from '../dataLayer/todosAcess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'

const logger = createLogger("TodosAccess")
const todoAccessLayer = new TodosAccess()

export const createTodo = async (request: CreateTodoRequest, userId: string) => {
  logger.info("Create todo")

  if (request) {
    logger.info("Adding a new")
    const todoId = uuid.v4()
    const createdAt = new Date().toISOString()
    return await todoAccessLayer.createTodo({
      userId: userId,
      todoId: todoId,
      createdAt,
      done: false,
      ...request
    });
  } else {
    logger.error("Failure")
  }
}

export const createAttachmentPresignedUrl = async (userId, todoId) => {
  const attachmentId = uuid.v4()
  logger.info("Create attachment presigned url")
  return await todoAccessLayer.createAttachmentPresignedUrl(userId, todoId, attachmentId)
}

export const getTodosForUser = async (userId: string) => {
  logger.info("Get todos")
  return await todoAccessLayer.getTodos(userId)
}

export const updateTodo = async (userId: string, todoId: string, request: UpdateTodoRequest) => {
  logger.info("Update todos")
  await todoAccessLayer.updateTodo(userId, todoId, request)
}

export const deleteTodo = async (userId: string, todoId: string) => {
  logger.info("Delete todos")
  await todoAccessLayer.deleteTodo(userId, todoId)
}