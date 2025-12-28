import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

// Zod Schema
const academicInfoSchema = z.object({
  affiliation: z.string().min(1, "Affiliation/University is required"),
  department: z.string().min(1, "Department is required"),
  positionTitle: z.string().optional(),
  orcid: z.string().optional(),
  academicAddress: z.string().optional(),
  academicCity: z.string().optional(),
  academicStateProvince: z.string().optional(),
  academicCountry: z.string().optional(),
  academicPostalCode: z.string().optional(),
  shortBio: z.string().optional(),
  resume: z.any().refine((file) => {
    if (!file) return true; // Optional field
    if (file instanceof File) {
      return file.size <= 2 * 1024 * 1024; // 2MB max
    }
    return true;
  }, "File size must be less than 2MB"),
});

type AcademicInfoFormData = z.infer<typeof academicInfoSchema>;

// Mock API service - replace with your actual implementation
const apiService = {
  get: async (url: string, config?: any) => {
    // Mock response
    return {
      data: {
        response: {
          affiliationUniversity: "Stanford University",
          department: "Computer Science",
          positionTitle: "Professor",
          orcid: "0000-0001-2345-6789",
          bio: "Researcher specializing in AI and machine learning.",
          resume: "john_doe_cv.pdf"
        }
      }
    };
  },
  put: async (url: string, data: any) => {
    console.log("Updating academic info:", data);
    return { success: true };
  },
};

const AcademicInfoForm: React.FC = () => {
  const [cvFileName, setCvFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const userId = "user123"; // Replace with actual userId

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, touchedFields }
  } = useForm<AcademicInfoFormData>({
    resolver: zodResolver(academicInfoSchema),
    mode: "onTouched",
    defaultValues: {
      affiliation: "",
      department: "",
      positionTitle: "",
      orcid: "",
      academicAddress: "",
      academicCity: "",
      academicStateProvince: "",
      academicCountry: "",
      academicPostalCode: "",
      shortBio: "",
      resume: null,
    }
  });

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    } else {
      setIsFetchingData(false);
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    setIsFetchingData(true);
    try {
      console.log("Fetching user profile for userId:", userId);
      const response = await apiService.get(`/user/profile`, {
        params: { userId },
      });

      console.log("Profile data received:", response);
      const data = response.data?.response || response;

      // Map API fields to form fields
      if (data.affiliationUniversity) setValue("affiliation", data.affiliationUniversity);
      if (data.department) setValue("department", data.department);
      if (data.positionTitle) setValue("positionTitle", data.positionTitle);
      if (data.orcid) setValue("orcid", data.orcid);
      if (data.bio) setValue("shortBio", data.bio);
      if (data.resume) setCvFileName(data.resume);
    } catch (error: any) {
      console.error("Error fetching user profile:", error);
      if (error?.response?.status !== 404) {
        console.error("Failed to fetch profile:", error?.response?.data?.message);
      }
    } finally {
      setIsFetchingData(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        e.target.value = "";
        return;
      }

      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PDF and Word documents are allowed");
        e.target.value = "";
        return;
      }

      setCvFileName(file.name);
      setValue("resume", file);
    }
  };

  const handleCancel = () => {
    reset();
    setCvFileName("");
    if (userId) {
      fetchUserProfile();
    }
  };

  const onSubmit = async (data: AcademicInfoFormData) => {
    console.log("Form submitted with data:", data);

    if (!userId) {
      toast.error("User ID is required");
      return;
    }

    setIsLoading(true);
    try {
      // Prepare payload with only the fields from this form
      const payload: any = {
        userId: userId,
        affiliationUniversity: data.affiliation,
        department: data.department,
        positionTitle: data.positionTitle || "",
        orcid: data.orcid || "",
        bio: data.shortBio || "",
      };

      // If resume file exists, handle file upload
      if (data.resume && data.resume instanceof File) {
        payload.resume = data.resume.name;
        // TODO: Implement file upload if your API supports it
        // const formData = new FormData();
        // formData.append('resume', data.resume);
        // await apiService.post('/user/upload-resume', formData);
      }

      console.log("Updating user profile with payload:", payload);
      await apiService.put("/user/update", payload);

      toast.success("Academic information updated successfully!");
      fetchUserProfile();
    } catch (error: any) {
      console.error("Error updating academic info:", error);
      toast.error(
        error?.response?.data?.message ||
        "Failed to update academic information. Please try again."
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
        <div className="text-center text-[#FF4C7D] mb-4">Loading profile...</div>
      )}

      <div className="space-y-6">
        {/* Form Body */}
        <div className="space-y-6">
          {/* Top Row */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Affiliation/University *
              </label>
              <input
                type="text"
                {...register("affiliation")}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              {errors.affiliation && touchedFields.affiliation && (
                <p className="text-red-500 text-xs mt-1">{errors.affiliation.message}</p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Department *
              </label>
              <input
                type="text"
                {...register("department")}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              {errors.department && touchedFields.department && (
                <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>
              )}
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Position Title
              </label>
              <input
                type="text"
                {...register("positionTitle")}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              {errors.positionTitle && touchedFields.positionTitle && (
                <p className="text-red-500 text-xs mt-1">{errors.positionTitle.message}</p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                ORCID
              </label>
              <input
                type="text"
                {...register("orcid")}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              {errors.orcid && touchedFields.orcid && (
                <p className="text-red-500 text-xs mt-1">{errors.orcid.message}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
              Address
            </label>
            <input
              type="text"
              {...register("academicAddress")}
              className="w-full h-12 rounded-md border-0 px-4"
              style={{ backgroundColor: "#F5F5F5" }}
            />
            {errors.academicAddress && touchedFields.academicAddress && (
              <p className="text-red-500 text-xs mt-1">{errors.academicAddress.message}</p>
            )}
          </div>

          {/* Third Row */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                City
              </label>
              <input
                type="text"
                {...register("academicCity")}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              {errors.academicCity && touchedFields.academicCity && (
                <p className="text-red-500 text-xs mt-1">{errors.academicCity.message}</p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                State/Province
              </label>
              <input
                type="text"
                {...register("academicStateProvince")}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              {errors.academicStateProvince && touchedFields.academicStateProvince && (
                <p className="text-red-500 text-xs mt-1">{errors.academicStateProvince.message}</p>
              )}
            </div>
          </div>

          {/* Fourth Row */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Country
              </label>
              <input
                type="text"
                {...register("academicCountry")}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              {errors.academicCountry && touchedFields.academicCountry && (
                <p className="text-red-500 text-xs mt-1">{errors.academicCountry.message}</p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Postal Code
              </label>
              <input
                type="text"
                {...register("academicPostalCode")}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              {errors.academicPostalCode && touchedFields.academicPostalCode && (
                <p className="text-red-500 text-xs mt-1">{errors.academicPostalCode.message}</p>
              )}
            </div>
          </div>

          {/* CV Upload */}
          <div>
            <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
              CV/Résumé (required *)
            </label>
            <div
              className="w-full rounded-[12px] p-8 text-center"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <div className="border-2 border-dashed border-gray-300 rounded-[12px] p-8">
                {cvFileName ? (
                  <div className="mb-4">
                    <p className="text-sm text-[#3E3232] font-medium">
                      Selected: {cvFileName}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-[#3E3232] mb-4">
                    Recommended PDF Or Word (Max Size 2MB)
                  </p>
                )}
                <label className="px-4 py-2 border border-[#E6E6E6] rounded-[12px] text-sm font-medium text-[#3E3232] hover:bg-gray-50 cursor-pointer inline-block">
                  + Select
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            {errors.resume && (
              <p className="text-red-500 text-xs mt-1">{errors.resume.message as string}</p>
            )}
          </div>
        </div>

        {/* Short Bio */}
        <div>
          <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
            Short Bio Summary (Will Show In Peer Directory)
          </label>
          <textarea
            {...register("shortBio")}
            rows={6}
            className="w-full rounded-md border-0 px-4 py-4"
            style={{ backgroundColor: "#F5F5F5" }}
          />
          {errors.shortBio && touchedFields.shortBio && (
            <p className="text-red-500 text-xs mt-1">{errors.shortBio.message}</p>
          )}
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

export default AcademicInfoForm;