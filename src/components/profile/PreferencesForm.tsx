import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
// import { z } from "zod";
import * as z from "zod";
import { apiService, cookieUtils } from "../../services";

// Zod Schema
const preferencesSchema = z.object({
  unsubscribeNewsletters: z.boolean(),
  allowBasicProfile: z.boolean(),
  websiteURL: z.string().optional().refine((val) => val === undefined || val === "" || /^https?:\/\/.+/.test(val), { message: "Please enter a valid URL" }),
  twitterURL: z.string().optional().refine((val) => val === undefined || val === "" || /^https?:\/\/.+/.test(val), { message: "Please enter a valid URL" }),
  // facebookURL: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  facebookURL: z.string().optional().refine((val) => val === undefined || val === "" || /^https?:\/\/.+/.test(val), { message: "Please enter a valid URL" }),
  googlePlusURL: z.string().optional().refine((val) => val === undefined || val === "" || /^https?:\/\/.+/.test(val), { message: "Please enter a valid URL" }),
  linkedinURL: z.string().optional().refine((val) => val === undefined || val === "" || /^https?:\/\/.+/.test(val), { message: "Please enter a valid URL" }),
});

type PreferencesFormData = z.infer<typeof preferencesSchema>;


const PreferencesForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const userId = "user123"; // Replace with actual userId

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, touchedFields }
  } = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    mode: "onTouched",
    defaultValues: {
      unsubscribeNewsletters: false,
      allowBasicProfile: false,
      websiteURL: "",
      twitterURL: "",
      facebookURL: "",
      googlePlusURL: "",
      linkedinURL: ""
    }
  });

  const token =
    cookieUtils.getCookie("COOKIES_USER_ACCESS_TOKEN") ||
    cookieUtils.getCookie("authToken");

  let decoded: any = {};
  if (token) {
    decoded = jwtDecode(token);
    console.log("Decoded Token:", decoded);
  }

  useEffect(() => {
    if (userId) {
      fetchUserPreferences();
    } else {
      setIsFetchingData(false);
    }
  }, [userId]);

  const fetchUserPreferences = async () => {
    setIsFetchingData(true);
    try {
      const response = await apiService.get("/user/profile", {
        params: { userId: decoded.userId },
      });
      const data = response.data?.response || response;
      // Prefill form
      setValue("unsubscribeNewsletters", data.unsubscribe ?? false);
      setValue("allowBasicProfile", data.allowProfile ?? true);
      setValue("websiteURL", data.websiteUrl ?? "");
      setValue("twitterURL", data?.socialMedia?.twitter ?? "");
      setValue("facebookURL", data?.socialMedia?.facebook ?? "");
      setValue("googlePlusURL", data?.socialMedia?.googlePlus ?? "");
      setValue("linkedinURL", data?.socialMedia?.linkedin ?? "");
    } catch (error: any) {
      console.error("Error fetching preferences:", error);
    } finally {
      setIsFetchingData(false);
    }
  };

  const handleCancel = () => {
    reset();
    if (userId) {
      fetchUserPreferences();
    }
  };

  const onSubmit = async (data: PreferencesFormData) => {
    if (!decoded.userId) {
      toast.error("User ID is required");
      return;
    }

    const payload = {
      userId: decoded.userId,
      unsubscribe: data.unsubscribeNewsletters,
      allowProfile: data.allowBasicProfile,
      websiteUrl: data.websiteURL || "",
      socialMedia: {
        twitter: data.twitterURL || "",
        facebook: data.facebookURL || "",
        googlePlus: data.googlePlusURL || "",
        linkedin: data.linkedinURL || "",
      },
    };

    setIsLoading(true);
    try {
      await apiService.put("/user/update", payload);
      toast.success("Preferences updated successfully!");
      fetchUserPreferences();
    } catch (error: any) {
      console.error("Error updating preferences:", error);
      toast.error(
        error?.response?.data?.message ||
        "Failed to update preferences. Please try again."
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
      {isFetchingData && (
        <div className="absolute inset-0 bg-opacity-80 flex items-center justify-center z-50 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[#295F9A] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#295F9A] font-medium">
              {isFetchingData ? "Loading preferences..." : "Saving changes..."}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Privacy & Notifications */}
        <div className="space-y-6">
          <a href="#" className="text-[#4282C8] hover:underline">
            Prevent showing my CV and email address to ISI members.
          </a>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 max-w-[1030px] w-full">
            {/* Unsubscribe */}
            <div className="flex-1">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("unsubscribeNewsletters")}
                  className="w-4 h-4 mt-1"
                  style={{ accentColor: "#3E3232" }}
                />
                <div>
                  <span className="text-sm text-[#3E3232]">
                    Unsubscribe from ISI newsletters and notifications.
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    (To stop receiving all emails change your settings in your Account Info)
                  </p>
                </div>
              </label>
            </div>

            {/* Allow Basic Profile */}
            <div className="flex-1">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("allowBasicProfile")}
                  className="w-4 h-4 mt-1"
                  style={{ accentColor: "#3E3232" }}
                />
                <div>
                  <span className="text-sm text-[#3E3232]">
                    Allow basic profile information to be shown on ISI website.
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    (Applies to ISI Members only. Your CV and email address will not be shown.)
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Your Website URL
              </label>
              <input
                type="text"
                {...register("websiteURL")}
                placeholder="https://example.com"
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              {/* {errors.websiteURL && touchedFields.websiteURL && (
                <p className="text-red-500 text-xs mt-1">{errors.websiteURL.message}</p>
              )} */}
            </div>

            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                X (Twitter) URL
              </label>
              <input
                type="text"
                {...register("twitterURL")}
                placeholder="https://twitter.com/username"
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              {/* {errors.twitterURL && touchedFields.twitterURL && (
                <p className="text-red-500 text-xs mt-1">{errors.twitterURL.message}</p>
              )} */}
            </div>

            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Facebook URL
              </label>
              <input
                type="text"
                {...register("facebookURL")}
                placeholder="https://facebook.com/username"
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              {/* {errors.facebookURL && touchedFields.facebookURL && (
                <p className="text-red-500 text-xs mt-1">{errors.facebookURL.message}</p>
              )} */}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Google+ URL
              </label>
              <input
                type="text"
                {...register("googlePlusURL")}
                placeholder="https://plus.google.com/username"
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              {errors.googlePlusURL && touchedFields.googlePlusURL && (
                <p className="text-red-500 text-xs mt-1">{errors.googlePlusURL.message}</p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                LinkedIn URL
              </label>
              <input
                type="text"
                {...register("linkedinURL")}
                placeholder="https://linkedin.com/in/username"
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              {errors.linkedinURL && touchedFields.linkedinURL && (
                <p className="text-red-500 text-xs mt-1">{errors.linkedinURL.message}</p>
              )}
            </div>
          </div>
        </div>

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

export default PreferencesForm;