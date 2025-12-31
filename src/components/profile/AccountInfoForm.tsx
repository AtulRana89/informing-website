import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { apiService, cookieUtils } from "../../services";
import { jwtDecode } from "jwt-decode";

// Zod Schema
const accountInfoSchema = z
  .object({
    primaryEmail: z.string().email("Please enter a valid email address"),
    receivePrimaryEmails: z.boolean(),
    secondaryEmail: z
      .string()
      .email("Please enter a valid email address")
      .optional(),
    receiveSecondaryEmails: z.boolean(),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
    memberUntil: z.string().optional(),
  })
  .refine(
    (data) => {
      // If current password is provided, new password must also be provided
      if (data.currentPassword && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password is required when changing password",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      // If new password is provided, it must match confirm password
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

type AccountInfoFormData = z.infer<typeof accountInfoSchema>;

// Mock API service

const AccountInfoForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [apiError, setApiError] = useState("");
  const userId = "user123"; // Replace with actual userId

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, touchedFields },
  } = useForm<AccountInfoFormData>({
    resolver: zodResolver(accountInfoSchema),
    mode: "onTouched",
    defaultValues: {
      primaryEmail: "",
      receivePrimaryEmails: false,
      secondaryEmail: "",
      receiveSecondaryEmails: false,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      memberUntil: "",
    },
  });

  const token =
    cookieUtils.getCookie("COOKIES_USER_ACCESS_TOKEN") ||
    cookieUtils.getCookie("authToken");

  let decoded: any = {};
  if (token) {
    decoded = jwtDecode(token);
    console.log("Decoded Token:", decoded);
  }

  const currentPassword = watch("currentPassword");
  const newPassword = watch("newPassword");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsFetching(true);
      setApiError("");

      const responseobject = await apiService.get("/user/profile", {
        params: { userId: decoded.userId },
      });

      const response = responseobject.data.response;

      if (response) {
        setValue("primaryEmail", response.email || "");
        setValue("receivePrimaryEmails", response.receivePrimaryEmail ?? true);
        setValue("secondaryEmail", response.receiveSecondaryEmail || "");
        setValue(
          "receiveSecondaryEmails",
          response.receiveReminderEmail ?? true
        );
        setValue("memberUntil", response.memberUntil || "");
      }
    } catch (err: any) {
      console.error("Error fetching user profile:", err);
      setApiError(err.response?.data?.message || "Failed to load user profile");
    } finally {
      setIsFetching(false);
    }
  };

  const handleCancel = () => {
    reset();
    if (userId) {
      fetchUserProfile();
    }
  };

  const onSubmit = async (data: AccountInfoFormData) => {
    console.log("Form submitted with data:", data);

    try {
      setIsLoading(true);
      setApiError("");

      // Prepare update payload
      const updatePayload: any = {
        userId: decoded.userId,
        email: data.primaryEmail,
        receivePrimaryEmail: data.receivePrimaryEmails,
        receiveReminderEmail: data.receiveSecondaryEmails,
        receiveSecondaryEmail: data.secondaryEmail || "",
        memberUntil: data.memberUntil || "",
      };

      // Only include password fields if changing password
      if (data.currentPassword && data.newPassword) {
        updatePayload.currentPassword = data.currentPassword;
        updatePayload.newPassword = data.newPassword;
      }

      console.log("Updating account with payload:", updatePayload);
      await apiService.put("/user/update", updatePayload);

      toast.success("Account information updated successfully!");

      // Clear password fields after successful update
      if (data.currentPassword) {
        setValue("currentPassword", "");
        setValue("newPassword", "");
        setValue("confirmPassword", "");
      }
    } catch (err: any) {
      console.error("Error updating account info:", err);
      setApiError(
        err.response?.data?.message || "Failed to update account information"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <div className="bg-white">
      {isFetching && (
        <div className="text-center text-[#FF4C7D] mb-4">
          Loading account info...
        </div>
      )}

      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {apiError}
        </div>
      )}

      <div className="space-y-6">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Primary Email */}
          <div>
            <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
              Primary Email *
            </label>
            <input
              type="email"
              {...register("primaryEmail")}
              className="w-full h-10 rounded-md border-0 px-3"
              style={{ backgroundColor: "#F5F5F5" }}
            />
            {errors.primaryEmail && touchedFields.primaryEmail && (
              <p className="text-red-500 text-xs mt-1">
                {errors.primaryEmail.message}
              </p>
            )}
            <label className="flex items-center gap-2 text-sm mt-2">
              <input
                type="checkbox"
                {...register("receivePrimaryEmails")}
                className="accent-[#295F9A]"
              />
              Receive emails at this address
            </label>
          </div>

          {/* Secondary Email */}
          <div>
            <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
              Secondary Email
            </label>
            <input
              type="email"
              {...register("secondaryEmail")}
              className="w-full h-10 rounded-md border-0 px-3"
              style={{ backgroundColor: "#F5F5F5" }}
            />
            {errors.secondaryEmail && touchedFields.secondaryEmail && (
              <p className="text-red-500 text-xs mt-1">
                {errors.secondaryEmail.message}
              </p>
            )}
            <label className="flex items-center gap-2 text-sm mt-2">
              <input
                type="checkbox"
                {...register("receiveSecondaryEmails")}
                className="accent-[#295F9A]"
              />
              Receive emails at this address
            </label>
          </div>

          {/* Current Password */}
          <div>
            <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
              Change My Password
            </label>
            <input
              type="password"
              {...register("currentPassword")}
              placeholder="Current password"
              className="w-full h-10 rounded-md border-0 px-3"
              style={{ backgroundColor: "#F5F5F5" }}
            />
            {errors.currentPassword && touchedFields.currentPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* New Password */}
          <div>
            <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword")}
              placeholder="New password"
              className="w-full h-10 rounded-md border-0 px-3"
              style={{ backgroundColor: "#F5F5F5" }}
              disabled={!currentPassword}
            />
            {errors.newPassword && touchedFields.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
              Type Your New Password Again
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm password"
              className="w-full h-10 rounded-md border-0 px-3"
              style={{ backgroundColor: "#F5F5F5" }}
              disabled={!newPassword}
            />
            {errors.confirmPassword && touchedFields.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Member Until */}
          <div>
            <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
              Member Until{" "}
              <span className="text-xs font-normal">
                (Become An ISI Member To Receive Access To Additional Features.
                <span className="text-[#295F9A] hover:underline cursor-pointer">
                  {" "}
                  View Options
                </span>
                )
              </span>
            </label>
            <input
              type="text"
              {...register("memberUntil")}
              className="w-full h-10 rounded-md border-0 px-3"
              style={{ backgroundColor: "#F5F5F5" }}
              readOnly
            />
          </div>
        </div>

        {/* Password Change Info */}
        {currentPassword && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded text-sm">
            <strong>Note:</strong> To change your password, please enter your
            current password, new password, and confirm the new password.
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-4 pt-8">
          <button
            onClick={handleFormSubmit}
            disabled={isLoading}
            className="px-16 py-3 rounded-[14px] text-white text-[16px] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#FF4C7D" }}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="px-16 py-3 rounded-[14px] text-[#3E3232] text-[16px] font-medium bg-[#F5F5F5] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoForm;
