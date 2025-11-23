import { Router } from 'express';
import { getUserById, getAllUsers, blockUserById } from '../controllers/userController';
import userAuth from '../middlewares/userAuth';
import userActive from '../middlewares/userActive';

const userRouter = Router();
userRouter.use(userAuth);
userRouter.use(userActive);

userRouter.get('/:id', getUserById);
userRouter.get('/', getAllUsers); 
userRouter.patch('/:id/block', blockUserById); 

export default userRouter;