import { User } from "../../models/user";
import { ok, serverErrors } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUsersController implements IController {
    constructor(private readonly getUsersRepository: IGetUsersRepository) {}

    async handle(): Promise<HttpResponse<User[] | string>> {
        try{
            const users = await this.getUsersRepository.getUsers()

            return ok<User[]>(users)
        } catch (error){
            return serverErrors()
        }

    }
}