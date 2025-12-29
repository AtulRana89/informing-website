import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { apiService } from "../../services";

// Zod Schema
const personalInfoSchema = z.object({
  personalTitle: z.string().optional(),
  gender: z.string().optional(),
  newsletterOptOut: z.boolean(),
  personalName: z.string().min(1, "Personal name is required"),
  middleInitial: z.string().optional(),
  familyName: z.string().min(1, "Family name is required"),
  address: z.string().optional(),
  city: z.string().min(1, "City is required"),
  stateProvince: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  officePhone: z.string().optional(),
  personalPhone: z.string().optional(),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;



const PersonalInfoForm: React.FC = () => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [apiError, setApiError] = useState("");
  const userId = "user123"; // Replace with actual userId

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, touchedFields }
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onTouched",
    defaultValues: {
      personalTitle: "",
      gender: "",
      newsletterOptOut: false,
      personalName: "",
      middleInitial: "",
      familyName: "",
      address: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      country: "",
      officePhone: "",
      personalPhone: "",
    }
  });

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      setIsFetching(true);
      setApiError("");

      const responseobject = await apiService.get("/user/profile", {
        params: { userId },
      });
      const response = responseobject.data.response;

      if (response) {
        setValue("personalTitle", response.personalTitle || "");
        setValue("personalName", response.personalName || "");
        setValue("middleInitial", response.middleInitial || "");
        setValue("familyName", response.familyName || "");
        setValue("gender", response.gender || "");
        setValue("address", response.address || "");
        setValue("city", response.city || "");
        setValue("stateProvince", response.stateProvince || "");
        setValue("postalCode", response.postalCode || "");
        setValue("country", response.country || "");
        setValue("officePhone", response.primaryTelephone || "");
        setValue("personalPhone", response.secondaryTelephone || "");

        if (response.profilePic) {
          setPhotoPreview(response.profilePic);
        }
      }
    } catch (err: any) {
      console.error("Error fetching user profile:", err);
      setApiError(err.response?.data?.data?.message || "Failed to load user profile");
    } finally {
      setIsFetching(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    reset();
    setPhotoFile(null);
    setPhotoPreview("");
    if (userId) {
      fetchUserProfile();
    }
  };

  const onSubmit = async (data: PersonalInfoFormData) => {
    if (!userId) {
      setApiError("User ID is required");
      return;
    }

    try {
      setIsLoading(true);
      setApiError("");

      let profilePicUrl = photoPreview;
      if (photoFile) {
        try {
          const uploadResponse = await apiService.uploadFile(
            "/upload/profile-pic",
            photoFile
          );
          profilePicUrl = uploadResponse.url || "";
        } catch (uploadErr) {
          console.error("Photo upload failed:", uploadErr);
        }
      }

      const updatePayload = {
        userId: userId,
        personalTitle: data.personalTitle,
        personalName: data.personalName,
        middleInitial: data.middleInitial || "",
        familyName: data.familyName,
        gender: data.gender || "",
        profilePic: profilePicUrl || "",
        primaryTelephone: data.officePhone || "",
        secondaryTelephone: data.personalPhone || "",
        address: data.address || "",
        city: data.city,
        stateProvince: data.stateProvince || "",
        postalCode: data.postalCode || "",
        country: data.country,
      };

      const res = await apiService.put("/user/update", updatePayload);
      console.log(res, "nnn")
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setApiError(err.response?.data?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <div className="bg-white p-6">
      {isFetching && (
        <div className="text-center text-[#295F9A] mb-4">Loading profile...</div>
      )}

      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {apiError}
        </div>
      )}

      <div className="space-y-6">
        {/* Personal Details Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Personal Title
              </label>
              <input
                type="text"
                {...register("personalTitle")}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
              {errors.personalTitle && touchedFields.personalTitle && (
                <p className="text-red-500 text-xs mt-1">{errors.personalTitle.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Gender
              </label>
              <input
                type="text"
                {...register("gender")}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
              {errors.gender && touchedFields.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
              )}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register("newsletterOptOut")}
              className="accent-[#295F9A]"
            />
            I'd like to opt out of the infrequent newsletter.
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Personal Name *
              </label>
              <input
                type="text"
                {...register("personalName")}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
              {errors.personalName && touchedFields.personalName && (
                <p className="text-red-500 text-xs mt-1">{errors.personalName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Middle Initial
              </label>
              <input
                type="text"
                {...register("middleInitial")}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
              {errors.middleInitial && touchedFields.middleInitial && (
                <p className="text-red-500 text-xs mt-1">{errors.middleInitial.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Family Name *
              </label>
              <input
                type="text"
                {...register("familyName")}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
              {errors.familyName && touchedFields.familyName && (
                <p className="text-red-500 text-xs mt-1">{errors.familyName.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Photo Upload Section */}
        <div className="space-y-4">
          <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
            Photo
          </label>

          <div
            className="p-8 rounded-[12px]"
            style={{ backgroundColor: '#F5F5F5' }}
          >
            <div className="border-2 border-dashed border-gray-300 rounded-[12px] p-8">
              <div className="flex items-center justify-center gap-4">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                ) : (
                  <svg
                    width="120"
                    height="96"
                    viewBox="0 0 120 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M40.5 22.5C45.375 22.5 49.5 26.625 49.5 31.5C49.5 36.5625 45.375 40.5 40.5 40.5C35.4375 40.5 31.5 36.5625 31.5 31.5C31.5 26.625 35.4375 22.5 40.5 22.5ZM95.8125 6C102.562 6 107.812 11.4375 107.812 18V78C107.812 84.75 102.375 90 95.8125 90H23.8125C17.25 90 11.8125 84.75 11.8125 78V18C11.8125 11.4375 17.25 6 23.8125 6H95.8125ZM98.8125 76.875V18C98.8125 16.5 97.5 15 95.8125 15H23.8125C22.3125 15 20.8125 16.5 20.8125 18L21 78L35.0625 60.375C35.8125 59.625 36.75 59.0625 37.875 59.0625C39 59.0625 39.9375 59.625 40.6875 60.375L47.625 69L67.5 42C68.25 41.0625 69.1875 40.5 70.5 40.5C71.625 40.5 72.5625 41.0625 73.125 42L98.8125 76.875Z"
                      fill="#3E3232"
                      fillOpacity="0.25"
                    />
                  </svg>
                )}

                <div className="flex flex-col items-center">
                  <p className="text-sm text-[#3E3232]/75 mb-2">
                    Recommended Size: 100 X 100px
                  </p>
                  <label className="px-4 py-2 border border-[#E6E6E6] rounded-[12px] text-sm font-medium text-[#3E3232] hover:bg-gray-50 cursor-pointer">
                    + Select
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
              Address
            </label>
            <input
              type="text"
              {...register("address")}
              className="w-full h-10 rounded-md border-0 px-3"
              style={{ backgroundColor: '#F5F5F5' }}
            />
            {errors.address && touchedFields.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                City *
              </label>
              <input
                type="text"
                {...register("city")}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
              {errors.city && touchedFields.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                State/Province
              </label>
              <input
                type="text"
                {...register("stateProvince")}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
              {errors.stateProvince && touchedFields.stateProvince && (
                <p className="text-red-500 text-xs mt-1">{errors.stateProvince.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Postal Code
              </label>
              <input
                type="text"
                {...register("postalCode")}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
              {errors.postalCode && touchedFields.postalCode && (
                <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Country *
              </label>
              <div className="relative">
                <select
                  {...register("country")}
                  className="w-full h-10 rounded-md border-0 px-3 pr-8 appearance-none"
                  style={{ backgroundColor: '#F5F5F5' }}
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
              {errors.country && touchedFields.country && (
                <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Office Phone Number
              </label>
              <input
                type="text"
                {...register("officePhone")}
                className="w-full h-10 rounded-md border-0 px-3"
                style={{ backgroundColor: '#F5F5F5' }}
              />
              {errors.officePhone && touchedFields.officePhone && (
                <p className="text-red-500 text-xs mt-1">{errors.officePhone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Personal Phone Number
              </label>
              <input
                type="text"
                {...register("personalPhone")}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
              {errors.personalPhone && touchedFields.personalPhone && (
                <p className="text-red-500 text-xs mt-1">{errors.personalPhone.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={handleFormSubmit}
            disabled={isLoading}
            className="px-6 py-2 bg-[#295F9A] text-white rounded-lg hover:bg-[#1e4a7a] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;