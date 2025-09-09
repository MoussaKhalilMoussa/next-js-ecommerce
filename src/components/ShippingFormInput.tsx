import { ShippingFormInputs, shippingFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ShippingForm = ({
  setShippingForm,
}: {
  setShippingForm: (data: ShippingFormInputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
  });

  const router = useRouter();

  const handleShippingFom: SubmitHandler<ShippingFormInputs> = (data) => {
    setShippingForm(data);
    router.push("/cart?step=3", { scroll: false });
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleShippingFom)}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs text-gray-500 font-medium">
          Name
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="name"
          placeholder="Jhon Doe"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-red-500"> {errors.name.message} </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500 font-medium" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          className="border-b border-gray-200 py-2 outline-none text-sm"
          id="email"
          placeholder="jhondoe@gmail.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500"> {errors.email.message} </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500 font-medium" htmlFor="phone">
          Phone
        </label>
        <input
          type="text"
          className="border-b border-gray-200 py-2 outline-none text-sm"
          id="phone"
          placeholder="1234567890"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-xs text-red-500"> {errors.phone.message} </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500 font-medium" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          className="border-b border-gray-200 py-2 outline-none text-sm"
          id="address"
          placeholder="123 Main St, Anytown"
          {...register("address")}
        />
        {errors.address && (
          <p className="text-xs text-red-500"> {errors.address.message} </p>
        )}
      </div>{" "}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500 font-medium" htmlFor="city">
          City
        </label>
        <input
          type="text"
          className="border-b border-gray-200 py-2 outline-none text-sm"
          id="city"
          placeholder="Istanbul"
          {...register("city")}
        />
        {errors.city && (
          <p className="text-xs text-red-500"> {errors.city.message} </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2 "
      >
        Continue
        <ArrowRight className="w-3 h-3" />
      </button>
    </form>
  );
};

export default ShippingForm;
