import React, { useState } from "react";

const PreferencesForm = () => {
  const [preferencesData, setPreferencesData] = useState({
    unsubscribeNewsletters: false,
    allowBasicProfile: false,
    websiteURL: "",
    twitterURL: "",
    facebookURL: "",
    googlePlusURL: "",
    linkedinURL: ""
  });

  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;

    setPreferencesData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <div className="bg-white">
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
                  name="unsubscribeNewsletters"
                  checked={preferencesData.unsubscribeNewsletters}
                  onChange={handleChange}
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
                  name="allowBasicProfile"
                  checked={preferencesData.allowBasicProfile}
                  onChange={handleChange}
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
            {[
              ["websiteURL", "Your Website URL"],
              ["twitterURL", "X (Twitter) URL"],
              ["facebookURL", "Facebook URL"]
            ].map(([name, label]) => (
              <div className="flex-1" key={name}>
                <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                  {label}
                </label>
                <input
                  type="text"
                  name={name}
                  value={preferencesData[name]}
                  onChange={handleChange}
                  className="w-full h-12 rounded-md border-0 px-4"
                  style={{ backgroundColor: "#F5F5F5" }}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {[
              ["googlePlusURL", "Google+ URL"],
              ["linkedinURL", "LinkedIn URL"]
            ].map(([name, label]) => (
              <div className="flex-1" key={name}>
                <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                  {label}
                </label>
                <input
                  type="text"
                  name={name}
                  value={preferencesData[name]}
                  onChange={handleChange}
                  className="w-full h-12 rounded-md border-0 px-4"
                  style={{ backgroundColor: "#F5F5F5" }}
                />
              </div>
            ))}
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

      </div>
    </div>
  );
};

export default PreferencesForm;
