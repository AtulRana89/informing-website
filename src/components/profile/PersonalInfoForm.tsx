import React, { useState } from "react";

const PersonalInfoForm: React.FC = () => {
  const [formData, setFormData] = useState({
    personalTitle: '',
    gender: '',
    newsletterOptOut: false,
    personalName: '',
    middleInitial: '',
    familyName: '',
    address: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    country: '',
    officePhone: '',
    personalPhone: '',
    primaryEmail: 'tagusaasia@gmail.com',
    receivePrimaryEmails: true,
    secondaryEmail: '',
    receiveSecondaryEmails: true,
    currentPassword: '•••••',
    newPassword: '',
    confirmPassword: '',
    memberUntil: '',
    affiliation: '',
    positionTitle: '',
    department: '',
    orcid: '',
    academicAddress: '123 University Street',
    academicCity: '',
    academicStateProvince: '',
    academicPostalCode: '',
    academicCountry: '',
    shortBio: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value
    }));
  };

  return (
    <div className="bg-white">
      <form className="space-y-6">
        {/* Personal Details Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Personal Title
              </label>
              <input
                type="text"
                name="personalTitle"
                value={formData.personalTitle}
                onChange={handleInputChange}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
            </div>

            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="newsletterOptOut"
              checked={formData.newsletterOptOut}
              onChange={handleInputChange}
              className="accent-[#295F9A]"
            />
            I'd like to opt out of the infrequent newsletter.
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Personal Name
              </label>
              <input
                type="text"
                name="personalName"
                value={formData.personalName}
                onChange={handleInputChange}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
            </div>

            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Middle Initial
              </label>
              <input
                type="text"
                name="middleInitial"
                value={formData.middleInitial}
                onChange={handleInputChange}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
            </div>

            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Family Name
              </label>
              <input
                type="text"
                name="familyName"
                value={formData.familyName}
                onChange={handleInputChange}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
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
              <div className="flex items-center justify-center">
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

                <div className="flex flex-col items-center">
                  <p className="text-sm text-[#3E3232]/75 mb-2">
                    Recommended Size: 100 X 100px
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 border border-[#E6E6E6] rounded-[12px] text-sm font-medium text-[#3E3232] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#295F9A]"
                  >
                    + Select
                  </button>
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
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full h-10 rounded-md border-0 px-3"
              style={{ backgroundColor: '#F5F5F5' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
            </div>

            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                State/Province
              </label>
              <input
                type="text"
                name="stateProvince"
                value={formData.stateProvince}
                onChange={handleInputChange}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
            </div>

            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Country
              </label>
              <div className="relative">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
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
            </div>

            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Office Phone Number
              </label>
              <div className="relative">
                <select
                  name="officePhone"
                  value={formData.officePhone}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-md border-0 px-3 pr-8 appearance-none"
                  style={{ backgroundColor: '#F5F5F5' }}
                >
                  <option value="">Select</option>
                  <option value="+1">+1 (US/CA)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+61">+61 (AU)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                Personal Phone Number
              </label>
              <input
                type="text"
                name="personalPhone"
                value={formData.personalPhone}
                onChange={handleInputChange}
                className="w-full h-12 rounded-md border-0 px-4"
                style={{ backgroundColor: '#F5F5F5' }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
