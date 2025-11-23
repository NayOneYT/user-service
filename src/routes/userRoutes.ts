import { Router } from 'express';
import { getUserById, getAllUsers, blockUserById } from '../controllers/userController';
import userAuth from '../middlewares/userAuth';

const userRouter = Router();
userRouter.use(userAuth)

userRouter.get('/:id', getUserById);
userRouter.get('/', getAllUsers); 
userRouter.patch('/:id/block', blockUserById); 

export default userRouter;