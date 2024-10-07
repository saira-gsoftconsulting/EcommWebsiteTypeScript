import React from "react";
import Button from "../common/button/button";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CustomInput from "../../components/common/inputField/inputField";
import { useNavigate } from "react-router-dom";
interface FormData {
  firstName: string;
  lastName: string;
  companyName?: string;
  streetAddress: string;
  townCity: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  additionalInfo?: string;
  bankName: string;
  accountNumber: string;
}

function CheckoutForm() {
  const navigate = useNavigate();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    navigate("/");
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="grid grid-cols-1 gap-8 p-4">
      <div className="bg-white p-6 md:ml-2 gap-5 flex flex-col md:items-start">
        <h2 className="text-2xl font-semibold mb-4 pt-4 md:pt-16 text-center md:text-left">
          Billing Details
        </h2>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <CustomInput
                    id="firstName"
                    type="text"
                    {...field}
                    className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.firstName ? "border-red-500" : ""
                    }`}
                  />
                )}
              />
              {errors.firstName && (
                <span className="text-red-600">{errors.firstName.message}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <CustomInput
                    id="lastName"
                    type="text"
                    {...field}
                    className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.lastName ? "border-red-500" : ""
                    }`}
                  />
                )}
              />
              {errors.lastName && (
                <span className="text-red-600">{errors.lastName.message}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between mb-4">
            <Button
              type="button"
              onClick={handleClick}
              className="mt-2 md:mt-0"
            >
              Return to Cart
            </Button>
            <Button type="submit" className="mt-2 md:mt-0">
              Place Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
