import express from 'express';
import { createUser, getUsers } from '../controllers/login.controller.js'
const router = express.Router();

router.post('/', createUser)

router.get('/:user1', getUsers)



export default router