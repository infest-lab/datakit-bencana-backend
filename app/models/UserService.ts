import * as mongoose from 'mongoose';
let moment = require('moment-timezone');

import {IUser} from './Interfaces';
import {IUserDocument} from './Documents';
import UserModel from './UserModel';

class UserService {
    constructor(private UserModel: mongoose.Model<IUserDocument>) {
        moment.tz.setDefault("Asia/Jakarta");
    }
    getDate(){ 
        return moment().format('YYYY-MM-DDTHH:mm:ssZz');
    }
    get(id:string){
    	return this.UserModel.findById(id);
    }
    byEmail(email:string){
    	return this.UserModel.findOne({email:email});
    }
    getAll(){
        return this.UserModel.find();
    }
    list({ skip = 0, limit = 50 , orderBy = 'name', asc = true} = {}){
		return this.UserModel.find().sort({ orderBy: (asc) ? 1:-1 })
		.skip(+skip)
		.limit(+limit);
    }
    add(input:IUser){
        input.createdAt = this.getDate();
        input.modifiedAt = this.getDate();
    	return this.UserModel.create(input);
    }
}

export default new UserService(UserModel);