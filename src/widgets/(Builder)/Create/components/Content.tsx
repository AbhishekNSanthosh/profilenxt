"use client";
import { ChangeEvent, useState } from "react";
import jsPDF from "jspdf";
import { FaRegDotCircle } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

interface Project {
  name: string;
  techStack: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  location: string;
  duration: string;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skills: string;
  additional: string;
}

interface Section {
  title: string;
  field: string;
  completed: boolean;
}

export default function ResumeBuilder() {
  const [selectedSection, setSelectedSection] = useState("generalInfo");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    experience: [{ role: "", company: "", duration: "", description: "" }],
    projects: [{ name: "", techStack: "", description: "" }],
    education: [{ institution: "", degree: "", location: "", duration: "" }],
    skills: "",
    additional: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: string,
    section: keyof FormData
  ) => {
    const updatedSection = [...(formData[section] as any)];
    updatedSection[index][field] = e.target.value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  const addRole = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { role: "", company: "", duration: "", description: "" },
      ],
    });
  };

  const removeRole = (index: number) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updatedExperience });
  };

  const sections = [
    {
      title: "General Info",
      field: "generalInfo",
      completed: formData.name !== "" && formData.email !== "",
    },
    {
      title: "Experiences",
      field: "experience",
      completed: formData.experience.length > 0,
    },
    {
      title: "Qualifications",
      field: "qualifications",
      completed: formData.education.length > 0,
    },
    {
      title: "Projects",
      field: "projects",
      completed: formData.projects.length > 0,
    },
    {
      title: "Contact",
      field: "contact",
      completed: formData.phone !== "" && formData.linkedin !== "",
    },
    {
      title: "Technical Skills",
      field: "technicalSkills",
      completed: formData.skills !== "",
    },
  ];

  const renderSection = () => {
    switch (selectedSection) {
      case "generalInfo":
        return (
          <div className="w-full flex flex-col items-start space-y-5">
            <span className="text-xl font-semibold text-gray-700">
              General Info
            </span>
            <div className="flex-row flex w-full items-center space-x-8">
              <div className="flex flex-col items-start flex-1 space-y-2">
                <span className="text-sm font-normal">First Name</span>
                <input
                  type="text"
                  className="px-2 py-3 flex w-full outline-none border border-gray-400 rounded-[15px]"
                  placeholder="Jacs"
                />
              </div>

              <div className="flex flex-col items-start flex-1 space-y-2">
                <span className="text-sm font-normal">Middle Name</span>
                <input
                  type="text"
                  className="px-2 py-3 flex w-full outline-none border border-gray-400 rounded-[15px]"
                  placeholder="J"
                />
              </div>

              <div className="flex flex-col items-start flex-1 space-y-2">
                <span className="text-sm font-normal">Last Name</span>
                <input
                  type="text"
                  className="px-2 py-3 flex w-full outline-none border border-gray-400 rounded-[15px]"
                  placeholder="Jacob"
                />
              </div>
            </div>

            <div className="flex-row flex w-full items-center space-x-8">
              <div className="flex flex-col items-start space-y-2 w-[24rem]">
                <span className="text-sm font-normal">Your role</span>
                <input
                  type="text"
                  className="px-2 py-3 flex w-full outline-none border border-gray-400 rounded-[15px]"
                  placeholder="Product Designer"
                />
              </div>
            </div>
            <div className="flex-row flex w-full items-center space-x-8">
              <div className="flex flex-col w-full items-start space-y-2">
                <span className="text-sm font-normal">About</span>
                <textarea
                  rows={8}
                  className="px-2 py-3 w-full flex outline-none border border-gray-400 rounded-[15px]"
                  placeholder="I'm a passionate product designer specializing in creating intuitive......."
                />
              </div>
            </div>
          </div>
        );
      case "qualifications":
        return (
          <>
            <h2 className="text-xl font-bold mb-4">Qualifications</h2>
            <input
              name="education"
              placeholder="Degree, Institution, Duration"
              value={formData.education[0]?.degree || ""}
              //   onChange={handleChange}
              className="p-2 border rounded-md w-full"
            />
          </>
        );
      case "experience":
        return (
          <div className="w-full flex flex-col items-start gap-5 pb-[10vh]">
            <div className="flex flex-col items-start gap-4 justify-between w-full">
              <span className="text-xl font-semibold text-gray-700">
                Experience
              </span>
              <div className="flex flex-row items-center gap-2">
                <span className="">Are you a fresher ?</span>
                <input type="checkbox" className="" />
              </div>
            </div>
            {formData.experience.map((exp, index) => (
              <div
                key={index}
                className={`w-full flex flex-col space-y-3 relative ${
                  index !== 0 && "mt-[20px]"
                }`}
              >
                <div className="flex w-full flex-row space-x-3 items-center justify-end">
                  <div className="flex flex-col w-full items-start gap-[5px]">
                    <div className="w-full">
                      <span className="text-sm font-normal">Company name</span>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          handleChange(e, index, "company", "experience")
                        }
                        className="px-2 w-full py-3 flex-1 outline-none border border-gray-400 rounded-[15px]"
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="w-full">
                      <span className="text-sm font-normal">Your role</span>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) =>
                          handleChange(e, index, "role", "experience")
                        }
                        className="px-2 w-full py-3 flex-1 outline-none border border-gray-400 rounded-[15px]"
                        placeholder="Role"
                      />
                    </div>
                    <div className="w-full">
                      <span className="text-sm font-normal">Duration</span>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) =>
                          handleChange(e, index, "duration", "experience")
                        }
                        className="px-2 w-full py-3 flex-1 outline-none border border-gray-400 rounded-[15px]"
                        placeholder="Duration"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <span className="text-sm font-normal">Job descritpion</span>
                    <textarea
                      rows={8}
                      value={exp.description}
                      onChange={(e) =>
                        handleChange(e, index, "description", "experience")
                      }
                      className="px-2 py-3 w-full outline-none  border border-gray-400 rounded-[15px]"
                      placeholder="Job Description"
                    />
                  </div>
                </div>
                {index !== 0 && (
                  <button
                    onClick={() => removeRole(index)}
                    className="text-red-500 absolute bottom-[-50px] right-5 text-xs border border-red-500 self-end py-2 rounded-[15px] w-[5rem] mt-5"
                  >
                    Remove
                  </button>
                )}
                {/* {<div className="w-full h-[1px] bg-gray-400 flex mt-5"></div>} */}
              </div>
            ))}
            <button
              onClick={addRole}
              className="flex flex-row gap-2 bg-white border border-gray-400 rounded-[15px] text-gray-800 text-sm px-3 py-2"
            >
              <CiCirclePlus className="text-xl" />
              Add New Role
            </button>
          </div>
        );
      case "projects":
        return (
          <>
            <h2 className="text-xl font-bold mb-4">Projects</h2>
            <input
              name="projects"
              placeholder="Project Name, Tech Stack"
              value={formData.projects[0]?.name || ""}
              //   onChange={handleChange}
              className="p-2 border rounded-md w-full"
            />
          </>
        );
      case "contact":
        return (
          <>
            <h2 className="text-xl font-bold mb-4">Contact</h2>
            <input
              name="linkedin"
              placeholder="LinkedIn"
              value={formData.linkedin}
              //   onChange={handleChange}
              className="p-2 border rounded-md w-full"
            />
            <input
              name="github"
              placeholder="GitHub"
              value={formData.github}
              //   onChange={handleChange}
              className="p-2 border rounded-md w-full"
            />
          </>
        );
      case "technicalSkills":
        return (
          <>
            <h2 className="text-xl font-bold mb-4">Technical Skills</h2>
            <textarea
              name="skills"
              placeholder="Technical Skills"
              value={formData.skills}
              //   onChange={handleChange}
              className="p-2 border rounded-md w-full"
            />
          </>
        );
      default:
        return <p>Select a section from the left</p>;
    }
  };

  return (
    <div className="flex flex-row h-[88vh] px-[2vw] py-[2vh] gap-8 pb-[10vh]">
      {/* Left Sidebar */}
      <div className="flex flex-col items-start w-[14vw]">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-row items-center w-full justify-start px-3 py-3 space-x-3 cursor-pointer ${
              selectedSection === section.field ? "bg-gray-200 rounded-md" : ""
            }`}
            onClick={() => setSelectedSection(section.field)}
          >
            <FaRegDotCircle
              className={section.completed ? "text-green-600" : "text-red-600"}
              title={section.completed ? "Completed" : "Not Completed"}
            />
            <span>{section.title}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-full w-[1px] bg-gray-400"></div>

      {/* Right Content (Dynamic Tabs) */}
      <div className="flex w-[95vw] flex-col">{renderSection()}</div>

      {/* Download Button */}
      {/* <button onClick={() => alert("Download Resume")} className="mt-4 p-2 bg-blue-500 text-white rounded-md w-full">
        Download Resume
      </button> */}
    </div>
  );
}
