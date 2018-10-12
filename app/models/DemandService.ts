import * as mongoose from 'mongoose';
const moment = require('moment-timezone');
import {IDemand} from './Interfaces';
import {IDemandDocument, IUserDocument} from './Documents';
import DemandModel from './DemandModel';
import UserModel from './UserModel';

class DemandService {
    public now:Date;

    constructor(
    	private DemandModel: mongoose.Model<IDemandDocument>,
    	private UserModel: mongoose.Model<IUserDocument>,
    ){
        moment.tz.setDefault("Asia/Jakarta");
    }
    getDate(){ 
        return moment().format('YYYY-MM-DDTHH:mm:ssZz');
    }
    get(id:string){
    	return this.DemandModel.findById(id);
    }
    getAll(){
        return this.DemandModel.find();
    }
    add(demand:IDemand){
        demand.verified = false;
		demand.closed = false;
		demand.createdAt = this.getDate();
		demand.modifiedAt = this.getDate();
    	return this.DemandModel.create(demand);
    }
    verify(id:string){
    	return this.DemandModel.findById(id)
    	.then(demand=>{
    		demand.verified = true;
    		demand.modifiedAt = this.getDate();
    		return demand.save();
    	}).catch(err=>{
    		return false;
    	})
    }
    close(id:string){
    	return this.DemandModel.findById(id)
    	.then(demand=>{
    		demand.closed = true;
    		demand.modifiedAt = this.getDate();
    		return demand.save();
    	}).catch(err=>{
    		return false;
    	})
    }
    getUser(id:string){
    	return this.UserModel.findById(id);
    }
    byPoint(id:string){
        return this.DemandModel.find({point:id}).sort({_id: -1});
    }
}

export default new DemandService(DemandModel, UserModel);