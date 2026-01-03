import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { apiService, cookieUtils } from "../../services";

// Types
interface SubTopic {
  _id: string;
  name: string;
  checked: boolean;
}

interface TopicOption {
  topicId: string;
  name: string;
  checked: boolean;
  hasSubOptions: boolean;
  expanded: boolean;
  subOptions?: SubTopic[];
}

interface TopicSection {
  topicId: string;
  name: string;
  minSelections: string;
  expanded: boolean;
  options?: TopicOption[];
}

// Zod Schema
const topicsSchema = z.object({
  selectedTopics: z.array(z.string()).min(2, "Please select at least 2 topics"),
});

type TopicsFormData = z.infer<typeof topicsSchema>;



const TopicsForm: React.FC = () => {
  const [sections, setSections] = useState<TopicSection[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const userId = "user123"; // Replace with actual userId

  const {
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<TopicsFormData>({
    resolver: zodResolver(topicsSchema),
    mode: "onSubmit",
    defaultValues: {
      selectedTopics: [],
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
    fetchTopics();
  }, []);

  useEffect(() => {
    setValue("selectedTopics", selectedTopics);
  }, [selectedTopics, setValue]);

  const fetchTopics = async () => {
    setIsFetching(true);
    try {
      const response = await apiService.get("/topic/topic-with-subtopics");
      const data = response.data?.response || response;

      const transformedSections: TopicSection[] =
        data.data?.list.map((topic: any) => ({
          topicId: topic.topicId,
          name: topic.name,
          minSelections: topic.minSelections || "1",
          expanded: false,
          options: topic.subTopics?.map((sub: any) => ({
            topicId: sub._id,
            name: sub.name,
            checked: false,
            hasSubOptions: false,
            expanded: false,
          })),
        })) || [];

      setSections(transformedSections);
    } catch (err) {
      console.error("Error fetching topics:", err);
    } finally {
      setIsFetching(false);
    }
  };

  const toggleSection = (sectionId: string) => {
    setSections(
      sections.map((section) =>
        section.topicId === sectionId
          ? { ...section, expanded: !section.expanded }
          : section
      )
    );
  };

  const toggleOption = (sectionId: string, optionId: string, name?: string) => {
    setSections(
      sections.map((section) => {
        if (section.topicId === sectionId && section.options) {
          return {
            ...section,
            options: section.options.map((option) => {
              if (option.topicId === optionId) {
                const newChecked = !option.checked;

                if (name) {
                  setSelectedTopics(
                    (prev) =>
                      newChecked
                        ? [...prev, name]
                        : prev.filter((t) => t !== name)
                  );
                }

                return {
                  ...option,
                  checked: newChecked,
                };
              }
              return option;
            }),
          };
        }
        return section;
      })
    );
  };

  const handleCancel = () => {
    setSelectedTopics([]);
    fetchTopics();
  };

  const onSubmit = async (data: TopicsFormData) => {
    // if (decoded.userId) {
    //   toast.error("User ID is required");
    //   return;
    // }

    setIsLoading(true);
    try {
      const payload = {
        userId: decoded.userId,
        selectedTopics: data.selectedTopics,
      };

      console.log("Updating topics with payload:", payload);
      await apiService.put("/user/update-topics", payload);

      toast.success("Topics updated successfully!");
    } catch (error: any) {
      console.error("Error updating topics:", error);
      toast.error(
        error?.response?.data?.message ||
        "Failed to update topics. Please try again."
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
        <div className="absolute inset-0 bg-opacity-80 flex items-center justify-center z-50 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[#295F9A] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#295F9A] font-medium">
              {isFetching ? "Loading topics..." : "Saving changes..."}
            </p>
          </div>
        </div>
      )}

      {errors.selectedTopics && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {errors.selectedTopics.message}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="flex-1">
          {sections.map((section) => (
            <div className="mb-6" key={section.topicId}>
              <div
                className="flex items-center justify-between p-4 cursor-pointer rounded-[12px]"
                onClick={() => toggleSection(section.topicId)}
                style={{ backgroundColor: "#F5F5F5" }}
              >
                <h3 className="text-sm font-semibold text-[#3E3232]">
                  {section.name}{" "}
                  {section.minSelections && parseInt(section.minSelections) > 1 && (
                    <span className="text-xs font-normal">
                      (At Least {section.minSelections})
                    </span>
                  )}
                </h3>
                <span className="text-lg">
                  {section.expanded ? "−" : "+"}
                </span>
              </div>

              {section.expanded && (
                <div
                  className="p-4 rounded-b-[12px]"
                  style={{ backgroundColor: "#F5F5F5" }}
                >
                  {section.options && section.options.length > 0 ? (
                    <div className="space-y-3">
                      {section.options.map((option) => (
                        <label
                          key={option.topicId}
                          className="flex items-start sm:items-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={option.checked}
                            onChange={() =>
                              toggleOption(section.topicId, option.topicId, option.name)
                            }
                            className="w-4 h-4 mt-1 sm:mt-0"
                            style={{ accentColor: "#3E3232" }}
                          />
                          <span className="text-sm text-[#3E3232] leading-relaxed">
                            {option.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[#3E3232]">
                      {section.name === "Special Sign Up" && "Special sign up options will appear here."}
                      {section.name === "General Lines Of Inquiry" && "General inquiry options will appear here."}
                      {section.name === "Research Topics - Specific" && "Research topic options will appear here."}
                      {section.name === "Type Of Research Method" && "Research method options will appear here."}
                      {section.name === "ISI Member Available For Co-Authorship" && "Co-authorship options will appear here."}
                    </p>
                  )}
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

            {selectedTopics.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No topics selected yet
              </p>
            ) : (
              <div className="space-y-2">
                {selectedTopics.map((topic) => (
                  <div
                    key={topic}
                    className="text-sm font-medium text-[#3E3232] p-3 rounded-[8px]"
                  >
                    {topic}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selection Count */}
          <div className="mt-4 text-sm text-center text-gray-600">
            {selectedTopics.length} topic{selectedTopics.length !== 1 ? "s" : ""} selected
            {selectedTopics.length < 2 && (
              <span className="text-red-500 block mt-1">
                (Minimum 2 required)
              </span>
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
  );
};

export default TopicsForm;