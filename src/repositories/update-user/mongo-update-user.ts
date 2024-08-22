import {ObjectId} from 'mongodb';
import {User} from '../../models/user'
import {IUpdateUserRepository, UpdateUserParams} from '../../controllers/update-ser/protocols';
import {MongoClient} from '../../database/mongo'

export class MongoUpdateUserRepository implements IUpdateUserRepository {
 async updateUser(id: string, params: UpdateUserParams): Promise<User>{
    await MongoClient.db.collection('users').updateOne({_id: new ObjectId}, {
        $set: {
            ...params,
        }
    });

    const user = await MongoClient.db.collection<Omit<User, 'id'>>('users').findOne({_id: new ObjectId(id)});

    if(!user){
        throw new Error('User not updated')
    }

    const {_id, ...rest} = user;

    return {id: _id.toHexString(), ...rest}
 }
}   
