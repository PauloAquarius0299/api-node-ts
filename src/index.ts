import { CreateUserController } from './controllers/create-user/create-user';
import { MongoCreateUserRepository } from './repositories/create-user/mongo-create-user';
import express from 'express'
import {config} from 'dotenv';
import { GetUsersController } from './controllers/get-users/get-user';
import {MongoGetUsersRepository} from './repositories/get-users/mongo-get-users'
import { MongoClient } from './database/mongo';
import { MongoUpdateUserRepository } from './repositories/update-user/mongo-update-user';
import { UpdateUserController } from './controllers/update-ser/update-user';
import { MongoDeleteUserRepository } from './repositories/delete-user/mongo-delete-users';
import { DeleteUserController } from './controllers/delete-user/delete-user';

const main = async () => {
    config();
    const app = express();

    app.use(express.json())

    await MongoClient.connect()

    app.get("/users", async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepository();
    
        const getUsersController = new GetUsersController(mongoGetUsersRepository);
    
        const {body, statusCode} = await getUsersController.handle();
    
        res.status(statusCode).send(body);
    });

    app.post('/users', async (req, res) => {
        const mongoCreateUserRepository = new MongoCreateUserRepository();

        const createUserController = new CreateUserController(mongoCreateUserRepository);

        const {body, statusCode} = await createUserController.handle({
            body: req.body}
        );

        return res.status(statusCode).send(body);
    });

    app.patch("/user/:id", async (req, res) => {
        const mongoUpdateUserRepository = new MongoUpdateUserRepository();

        const updateUserController = new UpdateUserController(mongoUpdateUserRepository);

        const {body, statusCode} = await updateUserController.handle({
            body: req.body,
            params: req.params
        })
    });

    app.delete("/user/:id", async (req, res) => {
        const mongoDeleteUserRepository = new MongoDeleteUserRepository();

        const deleteUserController = new DeleteUserController(mongoDeleteUserRepository);

        const {body, statusCode} = await deleteUserController.handle({
            params: req.params
        })
    });

    const port = process.env.PORT || 8000;

    app.listen(port, () => console.log(`listening on port ${port}!`));

};
main()

