const UserModel     = require("../models/UserModel");
const userService   = require("../services/user-service");
const apiResponse   = require("../helpers/ApiResponse");

const {createUserSchema} =  require("../validation/validation_schema");

class UserController {

    async createUser(req,res){

        try {
            const { name,email,address,phone } = req.body;

            const result = await createUserSchema.validateAsync(req.body);

            if (!email || !address || !name || !phone) {
                return res.status(400).json({ status:false,message: 'All fields are required' });
            }

            const exist = await UserModel.exists({ email });

            if (exist) {
                return res.status(400).json({status:false, message: 'User with given email id is arleady exist.' });
            }
            
            const user = await userService.createUser({ name,email,address,phone });
            try {

                res.status(200).json({status:true, data: user,message: 'User Created Success.' });

            } catch (err) {
                console.log(err);
                res.status(500).json({status:false, message: 'Something went wrong!!.' });
            }
            
        } catch (err) {
            console.log(err);
            if(err.isJoi === true){ return apiResponse.validationErrorWithData(res, err.details[0].message); }
            res.status(500).json({ status:false,message: 'Something went wrong.' });
        }

    }

    async editUser(req,res){

        try {
            const { name,address } = req.body;

            if (!name) {
                res.status(400).json({ message: 'Name field is required!' });
            }

            const { id } = req.params;    
            const user = await userService.findUser({_id:id});

            if (!user) {
                res.status(400).json({ message: 'No Data found!' });
            }

            user.name = name;
            user.address = address;

            user.save();

            let userData = {
                _id: user._id,
                phone: user.phone,
                email: user.email,
                name: user.name,
                address:user.address
            }
            res.status(200).json({status:true,message: 'User Update Successfully',data:userData });

        } catch (err) {
            console.log(err);
            res.status(500).json({status:false, message: 'message sending failed' });
        }
    }

    async deleteUser(req,res){

        try{

            const { id } = req.params;    

            if(!id){
                res.status(400).json({ message: 'User Id field is required!' });
            }

            const user = await userService.findUser({_id:id});

            if (!user) {
                res.status(400).json({ message: 'No Data found!' });
            }

            const result = userService.deleteUser({_id:id});

            res.status(200).json({status:true, message: 'User Deleted Successfully..!' });

        } catch(err){
            console.log(err);
            res.status(500).json({ message: 'message sending failed' });
        }
    }

    /*------------Get All Users-------------*/
    async getUsers(req,res){

        try{
            const users = await userService.getAllUsers();

            if (!users) {
                res.status(400).json({ message: 'No Data found!' });
            }
            res.status(200).json({status:true,data:users, message: 'All Users!' });

        } catch(err){
            console.log(err);
            res.status(500).json({ message: 'Something went wrong.' });
        }
    }

    /*------------Get Selected User-------------*/
    async getUserDetail(req,res){

        try{
            const { id } = req.params;

            const user = await userService.findUser({_id:id});

            if (!user) {
                res.status(400).json({ message: 'No Data found!' });
            }
            res.status(200).json({status:true,data:user, message: 'User Detail!' });

        } catch(err){
            console.log(err);
            res.status(500).json({ message: 'Something went wrong.' });
        }
    }

}

module.exports = new UserController();