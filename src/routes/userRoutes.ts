import { Router } from 'express';
import { getUserById, getAllUsers, blockUserById } from '../controllers/userController';
import userAuth from '../middlewares/userAuth';

const userRouter = Router();

userRouter.get('/:id', userAuth, getUserById);
userRouter.get('/', userAuth, getAllUsers); 
userRouter.patch('/:id/block', userAuth, blockUserById); 

export default userRouter;