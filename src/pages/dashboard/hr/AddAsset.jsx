import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../customHooks/useAuth";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddAsset = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleAssetSubmit = (data) => {
    // console.log(data);
    const productImage = data.productImage[0];

    const formData = new FormData();
    formData.append("image", productImage);
    // send the photo to store and get the url
    const imgAPIUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGEHOST
    }`;
    axios.post(imgAPIUrl, formData).then((res) => {
      const assetInfo = {
        productName: data.productName,
        productImage: res.data.data.url,
        productType: data.productType,
        productQuantity: Number(data.productQuantity),
        availableQuantity: Number(data.productQuantity),
        dateAdded: new Date(),
        hrEmail: user.email,
        companyName: user.companyName,
      };
      // console.log(user.companyName);

      axiosSecure
        .post("/assets", assetInfo)
        .then(() => {
          toast.success(`${data.productName} added successfully!`);
          reset();
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  };
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-semibold text-secondary text-center mb-6">
        Add New Asset
      </h2>

      <form onSubmit={handleSubmit(handleAssetSubmit)} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="font-medium text-secondary">Product Name</label>
          <input
            type="text"
            {...register("productName", {
              required: "Product name is required",
            })}
            className="w-full mt-1 p-3 rounded-lg border dark:text-primary border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter product name"
          />
          {errors.productName && (
            <p className="text-sm text-red-600">{errors.productName.message}</p>
          )}
        </div>

        {/* Product Image */}
        <div className="flex flex-col space-y-1">
          <label className="font-medium text-secondary flex items-center gap-2">
            Product Image
          </label>
          <input
            type="file"
            {...register("productImage", { required: true })}
            className="file-input dark:text-primary"
            placeholder="Upload Product Image"
          />
          {errors.productImage?.type === "required" && (
            <p className="text-red-600 text-sm">Product Image is required</p>
          )}
        </div>

        {/* Product Type */}
        <div>
          <label className="font-medium text-secondary">Product Type</label>
          <select
            {...register("productType", { required: true })}
            className="w-full mt-1 p-3 rounded-lg border dark:text-primary border-gray-300 focus:ring-2 focus:ring-primary"
          >
            <option value="">Select type</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
          {errors.productType && (
            <p className="text-sm text-red-600">Product type is required</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="font-medium text-secondary">Product Quantity</label>
          <input
            type="number"
            {...register("productQuantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Minimum quantity is 1" },
            })}
            className="w-full mt-1 p-3 rounded-lg border dark:text-primary border-gray-300 focus:ring-2 focus:ring-primary"
            placeholder="Enter quantity"
          />
          {errors.productQuantity && (
            <p className="text-sm text-red-600">
              {errors.productQuantity.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
