import { Router } from 'express';
import { getUserById } from '../controllers/userController';
import userAuth from '../middlewares/userAuth';

const userRouter = Router();

userRouter.get('/:id', userAuth, getUserById);
userRouter.get('/', () => {}); 
userRouter.patch('/:id/block', () => {}); 

export default userRouter;