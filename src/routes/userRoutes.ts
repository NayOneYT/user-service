import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', () => {}); 
userRouter.get('/:id', () => {});
userRouter.patch('/:id/block', () => {}); 

export default userRouter;