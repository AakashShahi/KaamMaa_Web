import React, { useState, useRef } from "react";
import { useGetWorkerProfile } from "../../hooks/worker/useWorkerProfile";
import { getBackendImageUrl } from "../../utils/backend_image";
import {
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaEnvelope,
    FaDownload,
    FaEdit,
    FaLock,
    FaCheckCircle,
    FaMinus,
    FaUser,
} from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import WorkerProfileModals from "./modals/WorkerProfileModals";

export default function WorkerProfile() {
    const { data, isLoading } = useGetWorkerProfile();
    const profileRef = useRef(null);
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);

    const handleDownloadPDF = async () => {
        const element = profileRef.current;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("KaamMaa_Worker_CV.pdf");
    };

    if (isLoading || !data?.data)
        return <div className="text-center py-10 text-gray-600">Loading...</div>;

    const profile = data.data;
    const profilePic = getBackendImageUrl(profile.profilePic);
    const certificatePic = getBackendImageUrl(profile.certificateUrl);
    const skillsArray =
        typeof profile.skills === "string"
            ? JSON.parse(profile.skills)
            : Array.isArray(profile.skills)
                ? profile.skills
                : [];

    return (
        <div className="max-w-5xl mx-auto py-10 px-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Worker CV</h1>
                <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 bg-[#FA5804] hover:bg-[#e65100] text-white px-4 py-2 rounded-md shadow"
                >
                    <FaDownload /> Download CV
                </button>
            </div>

            <div
                ref={profileRef}
                className="bg-white shadow-lg rounded-xl p-8 border border-orange-100 space-y-6"
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Profile image */}
                    <div className="relative">
                        {profilePic ? (
                            <img
                                src={profilePic}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-orange-200"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full border-4 border-orange-200 flex items-center justify-center bg-gray-100 text-orange-400 text-6xl">
                                <FaUser />
                            </div>
                        )}

                        <div className="absolute bottom-1 right-1 rounded-full p-1 bg-white shadow-md">
                            {profile.isVerified ? (
                                <FaCheckCircle className="text-green-600 text-xl" title="Verified" />
                            ) : (
                                <FaMinus className="text-gray-400 text-xl" title="Not Verified" />
                            )}
                        </div>
                    </div>

                    {/* Name and contact */}
                    <div className="space-y-2 text-center md:text-left w-full">
                        <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm text-gray-600">
                            <p className="flex items-center gap-2">
                                <FaEnvelope /> {profile.email}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaPhoneAlt /> {profile.phone}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaMapMarkerAlt /> {profile.location}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                    <div className="space-y-2">
                        <p>
                            <span className="font-semibold">Username:</span> {profile.username}
                        </p>
                        <p>
                            <span className="font-semibold">Role:</span>{" "}
                            <span className="text-orange-600">{profile.role}</span>
                        </p>
                        <p>
                            <span className="font-semibold">Verified:</span>{" "}
                            {profile.isVerified ? (
                                <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
                                    <FaCheckCircle /> Yes
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 text-orange-600 font-semibold">
                                    <FaMinus /> No
                                </span>
                            )}
                        </p>
                        <p>
                            <span className="font-semibold">Availability:</span>{" "}
                            {profile.availability ? (
                                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 font-medium text-sm">
                                    Available
                                </span>
                            ) : (
                                <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 font-medium text-sm">
                                    Not Available
                                </span>
                            )}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="font-semibold">Certificate:</p>
                        {certificatePic ? (
                            <img
                                src={certificatePic}
                                alt="Certificate"
                                className="w-40 h-28 object-cover rounded border border-gray-300"
                            />
                        ) : (
                            <p className="italic text-gray-500">No certificate uploaded.</p>
                        )}

                        <p className="flex items-center gap-2 pt-2">
                            <span className="font-semibold">Profession:</span>
                            {profile.profession ? (
                                <>
                                    {profile.profession.icon && (
                                        <img
                                            src={getBackendImageUrl(profile.profession.icon)}
                                            alt={profile.profession.category}
                                            className="w-8 h-8 object-contain"
                                        />
                                    )}
                                    <span>{profile.profession.category}</span>
                                </>
                            ) : (
                                <span>Not specified</span>
                            )}
                        </p>

                        <p>
                            <span className="font-semibold">Joined:</span>{" "}
                            {new Date(profile.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Skills */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {skillsArray.length > 0 ? (
                            skillsArray.map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-700 border border-orange-200"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-500 italic text-sm">No skills added.</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
                <button
                    onClick={() => setShowUpdateProfile(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
                >
                    <FaEdit /> Update Profile
                </button>
                <button
                    onClick={() => setShowChangePassword(true)}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-md shadow"
                >
                    <FaLock /> Change Password
                </button>
            </div>

            {/* Modals */}
            <WorkerProfileModals
                showUpdateProfile={showUpdateProfile}
                setShowUpdateProfile={setShowUpdateProfile}
                showChangePassword={showChangePassword}
                setShowChangePassword={setShowChangePassword}
            />
        </div>
    );
}
