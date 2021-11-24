import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

const AddUser = () => {
  let history = useHistory();

  const { register, handleSubmit,formState: { errors } } = useForm(); 

  console.log("Form errros",errors); 

  const onSubmit = async(user)=> {

    await axios.post("http://localhost:4000/v1/user", user);
    history.push("/");
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A User</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              {...register("name",{ 
                required: true ,
                maxLength: 30
              })}
            />

            <p className="text-danger">{errors.name?.type === 'required' && "name is required"}</p>

            {errors?.name?.type === "pattern" && (
                  <p className="text-danger">Valid Name only</p>
              )}  

            {errors?.name?.type === "maxLength" && (
                  <p className="text-danger">Name cannot exceed 30 characters</p>
            )}    

          </div>
          
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              {...register("email",{ 
                required: true ,
                maxLength: 30,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />

          <p className="text-danger">{errors.email?.type === 'required' && "email is required"}</p>

          {errors?.email?.type === "pattern" && (
                <p className="text-danger">Valid Email only</p>
            )}  

          {errors?.email?.type === "maxLength" && (
                <p className="text-danger">Email cannot exceed 30 characters</p>
          )}    


          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Phone Number"
              {...register("phone",{ 
                required: true ,
                maxLength: 10,
                minLength: 10,
                pattern: /[0-9]{4}/
              })}
            />
            <p className="text-danger">{errors.phone?.type === 'required' && "Phone Number is required"}</p>

            {errors?.phone?.type === "pattern" && (
                <p className="text-danger">Numbers  only</p>
            )}  

            {errors?.phone?.type === "maxLength" && (
                <p className="text-danger">Phone Number cannot exceed 10 characters</p>
            )}

            {errors?.phone?.type === "minLength" && (
                <p className="text-danger">Phone Number should be 10 digit</p>
            )} 
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Address"
              {...register("address",{ 
                required: true ,
                maxLength: 100
              })}
            />
            <p className="text-danger">{errors.address?.type === 'required' && "address is required"}</p>
            {errors?.address?.type === "maxLength" && (
                <p className="text-danger">address cannot exceed 100 characters</p>
            )}
          </div>
          <button className="btn btn-primary btn-block">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
