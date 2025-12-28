import React, { useState } from "react";

const AcademicInfoForm = () => {
  const [formData, setFormData] = useState({
    affiliation: "",
    department: "",
    positionTitle: "",
    orcid: "",
    academicAddress: "",
    academicCity: "",
    academicStateProvince: "",
    academicCountry: "",
    academicPostalCode: "",
    shortBio: ""
  });

  const handleInputChange = (e:any) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <div className="bg-white">
      <form className="space-y-6">

        {/* Form Body */}
        <div className="space-y-6">

          {/* Top Row */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Affiliation/University
              </label>
              <input
                type="text"
                name="affiliation"
                value={formData.affiliation}
                onChange={handleInputChange}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
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
                name="positionTitle"
                value={formData.positionTitle}
                onChange={handleInputChange}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                ORCID
              </label>
              <input
                type="text"
                name="orcid"
                value={formData.orcid}
                onChange={handleInputChange}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
              Address
            </label>
            <input
              type="text"
              name="academicAddress"
              value={formData.academicAddress}
              onChange={handleInputChange}
              className="w-full h-12 rounded-md border-0 px-4"
              style={{ backgroundColor: "#F5F5F5" }}
            />
          </div>

          {/* Third Row */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                City
              </label>
              <input
                type="text"
                name="academicCity"
                value={formData.academicCity}
                onChange={handleInputChange}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                State/Province
              </label>
              <input
                type="text"
                name="academicStateProvince"
                value={formData.academicStateProvince}
                onChange={handleInputChange}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
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
                name="academicCountry"
                value={formData.academicCountry}
                onChange={handleInputChange}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Postal Code
              </label>
              <input
                type="text"
                name="academicPostalCode"
                value={formData.academicPostalCode}
                onChange={handleInputChange}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: "#F5F5F5" }}
              />
            </div>
          </div>

          {/* CV Upload (UI Only) */}
          <div>
            <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
              CV/Résumé (required *)
            </label>
            <div
              className="w-full rounded-[12px] p-8 text-center"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <div className="border-2 border-dashed border-gray-300 rounded-[12px] p-8">
                <p className="text-sm text-[#3E3232] mb-4">
                  Recommended PDF Or Word (Max Size 2MB)
                </p>
                <button
                  type="button"
                  className="px-4 py-2 border border-[#E6E6E6] rounded-[12px] text-sm font-medium text-[#3E3232] hover:bg-gray-50"
                >
                  + Select
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Short Bio */}
        <div>
          <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
            Short Bio Summary (Will Show In Peer Directory)
          </label>
          <textarea
            name="shortBio"
            value={formData.shortBio}
            onChange={handleInputChange}
            rows={6}
            className="w-full rounded-md border-0 px-4 py-4"
            style={{ backgroundColor: "#F5F5F5" }}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 pt-8">
          <button
            type="button"
            className="px-16 py-3 rounded-[14px] text-white text-[16px] font-medium"
            style={{ backgroundColor: "#FF4C7D" }}
          >
            Save
          </button>
          <button
            type="button"
            className="px-16 py-3 rounded-[14px] text-[#3E3232] text-[16px] font-medium bg-[#F5F5F5] hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default AcademicInfoForm;
