import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

// Zod Schema
const preferencesSchema = z.object({
  unsubscribeNewsletters: z.boolean(),
  allowBasicProfile: z.boolean(),
  websiteURL: z.string().url("Please enter a valid URL").or(z.literal("")),
  twitterURL: z.string().url("Please enter a valid URL").or(z.literal("")),
  facebookURL: z.string().url("Please enter a valid URL").or(z.literal("")),
  googlePlusURL: z.string().url("Please enter a valid URL").or(z.literal("")),
  linkedinURL: z.string().url("Please enter a valid URL").or(z.literal("")),
});

type PreferencesFormData = z.infer<typeof preferencesSchema>;

// Mock API service
const apiService = {
  get: async (url: string, config?: any) => {
    // Mock response
    return {
      data: {
        response: {
          unsubscribe: false,
          allowProfile: true,
          websiteUrl: "https://example.com",
          socialMedia: {
            twitter: "https://twitter.com/username",
            facebook: "https://facebook.com/username",
            googlePlus: "",
            linkedin: "https://linkedin.com/in/username"
          }
        }
      }
    };
  },
  put: async (url: string, data: any) => {
    console.log("Updating preferences:", data);
    return { success: true };
  },
};

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
        params: { userId },
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
    if (!userId) {
      toast.error("User ID is required");
      return;
    }

    const payload = {
      userId,
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
        <div className="text-center text-[#FF4C7D] mb-4">Loading preferences...</div>
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
              {errors.websiteURL && touchedFields.websiteURL && (
                <p className="text-red-500 text-xs mt-1">{errors.websiteURL.message}</p>
              )}
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
              {errors.twitterURL && touchedFields.twitterURL && (
                <p className="text-red-500 text-xs mt-1">{errors.twitterURL.message}</p>
              )}
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
              {errors.facebookURL && touchedFields.facebookURL && (
                <p className="text-red-500 text-xs mt-1">{errors.facebookURL.message}</p>
              )}
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