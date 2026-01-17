"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  Crown,
  Plus,
  Trash2,
  Download,
  ChevronLeft,
  Briefcase,
  GraduationCap,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
} from "lucide-react";

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string;
}

const initialData: ResumeData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  summary: "",
  experiences: [],
  education: [],
  skills: "",
};

export default function BuilderPage() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [activeSection, setActiveSection] = useState("personal");

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setData({ ...data, experiences: [...data.experiences, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setData({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    setData({
      ...data,
      experiences: data.experiences.filter((exp) => exp.id !== id),
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    };
    setData({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setData({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    setData({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: "personal", label: "Personal", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#c9a96e]/5 via-transparent to-transparent pointer-events-none" />

      <nav className="relative z-10 border-b border-[#c9a96e]/10">
        <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-[#888888] hover:text-[#faf9f7] transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="font-body text-sm">Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-[#c9a96e]" />
              <span className="font-display text-xl text-[#faf9f7]">Resume Builder</span>
            </div>
          </div>
          <Button
            onClick={handlePrint}
            className="bg-[#c9a96e] text-[#0a0a0a] hover:bg-[#e8d5a3] font-body tracking-wider gap-2"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </nav>

      <div className="max-w-[1800px] mx-auto flex">
        <aside className="w-64 min-h-[calc(100vh-73px)] border-r border-[#c9a96e]/10 p-6 print:hidden">
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-[#c9a96e]/10 text-[#c9a96e] border border-[#c9a96e]/30"
                    : "text-[#888888] hover:text-[#faf9f7] hover:bg-white/5"
                }`}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-8 print:hidden">
          <AnimatePresence mode="wait">
            {activeSection === "personal" && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-display text-3xl text-[#faf9f7] mb-2">Personal Information</h2>
                  <p className="font-body text-[#888888]">Let&apos;s start with your basic details</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block font-body text-sm text-[#888888] mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a96e]" />
                      <Input
                        value={data.fullName}
                        onChange={(e) => setData({ ...data, fullName: e.target.value })}
                        placeholder="John Doe"
                        className="pl-12 bg-[#111111] border-[#c9a96e]/20 text-[#faf9f7] placeholder:text-[#555555] focus:border-[#c9a96e] h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-sm text-[#888888] mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a96e]" />
                      <Input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        placeholder="john@example.com"
                        className="pl-12 bg-[#111111] border-[#c9a96e]/20 text-[#faf9f7] placeholder:text-[#555555] focus:border-[#c9a96e] h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-sm text-[#888888] mb-2">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a96e]" />
                      <Input
                        value={data.phone}
                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="pl-12 bg-[#111111] border-[#c9a96e]/20 text-[#faf9f7] placeholder:text-[#555555] focus:border-[#c9a96e] h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-sm text-[#888888] mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a96e]" />
                      <Input
                        value={data.location}
                        onChange={(e) => setData({ ...data, location: e.target.value })}
                        placeholder="New York, NY"
                        className="pl-12 bg-[#111111] border-[#c9a96e]/20 text-[#faf9f7] placeholder:text-[#555555] focus:border-[#c9a96e] h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-sm text-[#888888] mb-2">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a96e]" />
                      <Input
                        value={data.website}
                        onChange={(e) => setData({ ...data, website: e.target.value })}
                        placeholder="linkedin.com/in/johndoe"
                        className="pl-12 bg-[#111111] border-[#c9a96e]/20 text-[#faf9f7] placeholder:text-[#555555] focus:border-[#c9a96e] h-12"
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="block font-body text-sm text-[#888888] mb-2">Professional Summary</label>
                    <Textarea
                      value={data.summary}
                      onChange={(e) => setData({ ...data, summary: e.target.value })}
                      placeholder="A brief description of your professional background and career goals..."
                      className="bg-[#111111] border-[#c9a96e]/20 text-[#faf9f7] placeholder:text-[#555555] focus:border-[#c9a96e] min-h-32"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === "experience" && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-3xl text-[#faf9f7] mb-2">Work Experience</h2>
                    <p className="font-body text-[#888888]">Add your professional experience</p>
                  </div>
                  <Button
                    onClick={addExperience}
                    className="bg-[#c9a96e]/10 text-[#c9a96e] border border-[#c9a96e]/30 hover:bg-[#c9a96e]/20 gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Experience
                  </Button>
                </div>

                <div className="space-y-6">
                  {data.experiences.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="luxury-card rounded-xl p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-display text-lg text-[#c9a96e]">Experience {index + 1}</span>
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="text-[#888888] hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                          placeholder="Company Name"
                          className="bg-[#0a0a0a] border-[#c9a96e]/20 text-[#faf9f7] placeholder:text-[#555555]"
                        />
                        <Input
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                          placeholder="Position"
                          className="bg-[#0a0a0a] border-[#c9a96e]/20 text-[#faf9f7] placeholder:text-[#555555]"
                        />
                        <Input
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                          placeholder="Start Date (e.g., Jan 2020)"
                          className="bg-[#0a0a0a] border-[#c9a96e]/20 text-[#faf9f7] placeholder:text-[#555555]"
                        />
                        <Input
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                          placeholder="End Date (or Present)"
                          className="bg-[#0a0a0a] border-[#c9a96e]/20 text-[#faf9f7] placeholder:text-[#555555]"
                        />
                        <div className="col-span-2">
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                            placeholder="Describe your responsibilities and achievements..."
                            className="bg-[#0a0a0a] border-[#c9a96e]/20 text-[#faf9f7] placeholder:text-[#555555]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {data.experiences.length === 0 && (
                    <div className="luxury-card rounded-xl p-12 text-center">
                      <Briefcase className="w-12 h-12 text-[#c9a96e]/30 mx-auto mb-4" />
                      <p className="font-body text-[#888888]">No experience added yet</p>
                      <p className="font-body text-sm text-[#555555]">Click &quot;Add Experience&quot; to get started</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeSection === "education" && (
              <motion.div
                key="education"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-3xl text-[#faf9f7] mb-2">Education</h2>
                    <p className="font-body text-[#888888]">Add your educational background</p>
                  </div>
                  <Button
                    onClick={addEducation}
                    className="bg-[#c9a96e]/10 text-[#c9a96e] border border-[#c9a96e]/30 hover:bg-[#c9a96e]/20 gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Education
                  </Button>
                </div>

                <div className="space-y-6">
                  {data.education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="luxury-card rounded-xl p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-display text-lg text-[#c9a96e]">Education {index + 1}</span>
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="text-[#888888] hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                          placeholder="Institution Name"
                          className="bg-[#0a0a0a] border-[#c9a96e]/20 text-[#faf9f7] placeholder:text-[#555555]"
                        />
                        <Input
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                          placeholder="Degree (e.g., Bachelor's)"
                          className="bg-[#0a0a0a] border-[#c9a96e]/20 text-[#faf9f7] placeholder:text-[#555555]"
                        />
                        <Input
                          value={edu.field}
                          onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                          placeholder="Field of Study"
                          className="bg-[#0a0a0a] border-[#c9a96e]/20 text-[#faf9f7] placeholder:text-[#555555]"
                        />
                        <div className="flex gap-4">
                          <Input
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                            placeholder="Start Year"
                            className="bg-[#0a0a0a] border-[#c9a96e]/20 text-[#faf9f7] placeholder:text-[#555555]"
                          />
                          <Input
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                            placeholder="End Year"
                            className="bg-[#0a0a0a] border-[#c9a96e]/20 text-[#faf9f7] placeholder:text-[#555555]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {data.education.length === 0 && (
                    <div className="luxury-card rounded-xl p-12 text-center">
                      <GraduationCap className="w-12 h-12 text-[#c9a96e]/30 mx-auto mb-4" />
                      <p className="font-body text-[#888888]">No education added yet</p>
                      <p className="font-body text-sm text-[#555555]">Click &quot;Add Education&quot; to get started</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeSection === "skills" && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-display text-3xl text-[#faf9f7] mb-2">Skills</h2>
                  <p className="font-body text-[#888888]">List your key skills and competencies</p>
                </div>

                <div>
                  <label className="block font-body text-sm text-[#888888] mb-2">Skills (comma-separated)</label>
                  <Textarea
                    value={data.skills}
                    onChange={(e) => setData({ ...data, skills: e.target.value })}
                    placeholder="JavaScript, React, Node.js, Project Management, Leadership..."
                    className="bg-[#111111] border-[#c9a96e]/20 text-[#faf9f7] placeholder:text-[#555555] focus:border-[#c9a96e] min-h-40"
                  />
                </div>

                {data.skills && (
                  <div className="luxury-card rounded-xl p-6">
                    <h3 className="font-display text-lg text-[#c9a96e] mb-4">Preview</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.split(",").map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#c9a96e]/10 border border-[#c9a96e]/30 rounded-full text-sm text-[#faf9f7] font-body"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <aside className="w-[500px] min-h-[calc(100vh-73px)] border-l border-[#c9a96e]/10 p-8 print:hidden">
          <div className="sticky top-8">
            <h3 className="font-display text-xl text-[#c9a96e] mb-6">Live Preview</h3>
            <div className="bg-white rounded-lg p-6 text-black aspect-[8.5/11] overflow-auto text-xs">
              <ResumePreview data={data} />
            </div>
          </div>
        </aside>
      </div>

      <div className="hidden print:block">
        <div className="bg-white p-12 min-h-screen">
          <ResumePreview data={data} />
        </div>
      </div>
    </div>
  );
}

function ResumePreview({ data }: { data: ResumeData }) {
  return (
    <div className="font-sans">
      <div className="text-center mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {data.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 text-gray-600 text-[10px]">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
          {data.website && <span>{data.website}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">
            Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-[10px]">{data.summary}</p>
        </div>
      )}

      {data.experiences.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">
            Experience
          </h2>
          <div className="space-y-3">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-[11px]">{exp.position || "Position"}</h3>
                    <p className="text-gray-600 text-[10px]">{exp.company || "Company"}</p>
                  </div>
                  <span className="text-gray-500 text-[9px]">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-gray-700 mt-1 text-[10px] leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900 text-[11px]">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-600 text-[10px]">{edu.institution || "Institution"}</p>
                </div>
                <span className="text-gray-500 text-[9px]">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills && (
        <div>
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1">
            {data.skills.split(",").map((skill, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-100 rounded text-[9px] text-gray-700"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
