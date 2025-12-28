import React, { useState } from "react";

const TopicsForm = () => {
  const [expandedSections, setExpandedSections] = useState({
    "fields-specializations": false,
    "special-signup": false,
    "general-inquiry": false,
    "research-topics": false,
    "research-method": false,
    "co-authorship": false,
  });

  const [selectedTopics, setSelectedTopics] = useState([]);

  const toggleSection = (section: any) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleTopicChange = (topic: any, checked: any) => {
    setSelectedTopics((prev) =>
      checked ? [...prev, topic] : prev.filter((t) => t !== topic)
    );
  };

  const topicsList = [
    "Applied Psychology",
    "Artificial Intelligence (AI) and application",
    "Deep/Machine Learning & Data Science",
    "Technology/Computer Science Issue",
    "Library / Information Science",
    "Art, Design, Architecture, Fine Arts, History",
    "Business/Commerce/Organizational Issue",
    "Linguistics/Rhetoric/Communications",
    "Journalism/Public Relations",
    "Expressive Arts (Music, Dance, and so on)",
    "Psychology/Sociology / Brain Science/ HCI / Usability Issues",
    "Medical / Health / Biological issues",
    "Justice/Legal Issue",
    "Public/Government/Community Issues/Politics",
    "Engineering, Cybernetics, Systemics",
  ];

  return (
    <div className="bg-white">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="flex-1">
          {/* Fields / Specializations */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between p-4 cursor-pointer rounded-[12px]"
              onClick={() => toggleSection("fields-specializations")}
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <h3 className="text-sm font-semibold text-[#3E3232]">
                Fields/Specializations{" "}
                <span className="text-xs font-normal">(At Least 2)</span>
              </h3>
              <span className="text-lg">
                {expandedSections["fields-specializations"] ? "−" : "+"}
              </span>
            </div>

            {expandedSections["fields-specializations"] && (
              <div
                className="p-4 rounded-b-[12px]"
                style={{ backgroundColor: "#F5F5F5" }}
              >
                <div className="space-y-3">
                  {topicsList.map((topic) => (
                    <label
                      key={topic}
                      className="flex items-start sm:items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={(e) =>
                          handleTopicChange(topic, e.target.checked)
                        }
                        className="w-4 h-4 mt-1 sm:mt-0"
                        style={{ accentColor: "#3E3232" }}
                      />
                      <span className="text-sm text-[#3E3232] leading-relaxed">
                        {topic}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reusable collapsed sections */}
          {[
            [
              "special-signup",
              "Special Sign Up",
              "Special sign up options will appear here.",
            ],
            [
              "general-inquiry",
              "General Lines Of Inquiry",
              "General inquiry options will appear here.",
            ],
            [
              "research-topics",
              "Research Topics - Specific",
              "Research topic options will appear here.",
            ],
            [
              "research-method",
              "Type Of Research Method",
              "Research method options will appear here.",
            ],
            [
              "co-authorship",
              "ISI Member Available For Co-Authorship",
              "Co-authorship options will appear here.",
            ],
          ].map(([key, title, text]) => (
            <div className="mb-6" key={key}>
              <div
                className="flex items-center justify-between p-4 cursor-pointer rounded-[12px]"
                onClick={() => toggleSection(key)}
                style={{ backgroundColor: "#F5F5F5" }}
              >
                <h3 className="text-sm font-semibold text-[#3E3232]">
                  {title}
                </h3>
                <span className="text-lg">
                  {expandedSections[key] ? "−" : "+"}
                </span>
              </div>

              {expandedSections[key] && (
                <div
                  className="p-4 rounded-b-[12px]"
                  style={{ backgroundColor: "#F5F5F5" }}
                >
                  <p className="text-sm text-[#3E3232]">{text}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column – Selected Topics */}
        <div className="w-full lg:w-80">
          <div
            className="border-2 border-dashed border-gray-300 rounded-[12px] p-4"
            style={{ backgroundColor: "#F5F5F5" }}
          >
            <h3 className="text-lg font-semibold text-[#3E3232] mb-4 flex items-center">
              <span
                className="w-[4px] h-[10px] rounded-full mr-2"
                style={{ backgroundColor: "#4282C8" }}
              />
              Selected Topics
            </h3>

            <div className="space-y-2">
              {selectedTopics.map((topic) => (
                <div
                  key={topic}
                  className="text-sm font-medium text-[#3E3232] p-3 rounded-[8px]"
                  style={{ backgroundColor: "#F5F5F5" }}
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>
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
  );
};

export default TopicsForm;
