import mongoose from '@/config/DBHelpler';

const Schema=mongoose.Schema;

const UserSchema=new Schema( {
  'name':{type:String},
  'age':{type:Number},
  'email':{type:String},
} );

const UserModel=mongoose.model( 'users', UserSchema );

export default UserModel;
