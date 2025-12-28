import React, { useState } from "react";

const AccountInfoForm = () => {
  const [formData, setFormData] = useState({
    primaryEmail: "",
    receivePrimaryEmails: false,
    secondaryEmail: "",
    receiveSecondaryEmails: false,
    currentPassword: "",
    newPassword: "",
    memberUntil: ""
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

        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Primary Email */}
          <div>
            <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
              Primary Email
            </label>
            <input
              type="email"
              name="primaryEmail"
              value={formData.primaryEmail}
              onChange={handleInputChange}
              className="w-full h-10 rounded-md border-0 px-3"
              style={{ backgroundColor: "#F5F5F5" }}
            />
            <label className="flex items-center gap-2 text-sm mt-2">
              <input
                type="checkbox"
                name="receivePrimaryEmails"
                checked={formData.receivePrimaryEmails}
                onChange={handleInputChange}
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
              name="secondaryEmail"
              value={formData.secondaryEmail}
              onChange={handleInputChange}
              className="w-full h-10 rounded-md border-0 px-3"
              style={{ backgroundColor: "#F5F5F5" }}
            />
            <label className="flex items-center gap-2 text-sm mt-2">
              <input
                type="checkbox"
                name="receiveSecondaryEmails"
                checked={formData.receiveSecondaryEmails}
                onChange={handleInputChange}
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
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className="w-full h-10 rounded-md border-0 px-3"
              style={{ backgroundColor: "#F5F5F5" }}
            />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* New Password */}
          <div>
            <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
              Type Your New Password Again
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full h-10 rounded-md border-0 px-3"
              style={{ backgroundColor: "#F5F5F5" }}
            />
          </div>

          {/* Member Until */}
          <div>
            <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
              Member Until{" "}
              <span className="text-xs font-normal">
                (Become An ISI Member To Receive Access To Additional Features.
                <span className="text-[#295F9A] hover:underline cursor-pointer">
                  {" "}View Options
                </span>
                )
              </span>
            </label>
            <input
              type="text"
              name="memberUntil"
              value={formData.memberUntil}
              onChange={handleInputChange}
              className="w-full h-10 rounded-md border-0 px-3"
              style={{ backgroundColor: "#F5F5F5" }}
            />
          </div>
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

export default AccountInfoForm;
