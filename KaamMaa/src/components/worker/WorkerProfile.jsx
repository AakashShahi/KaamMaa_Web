import React, { useState, useRef, useEffect } from "react";
import {
    useGetWorkerProfile,
    useApplyForVerification,
    useCancelVerification,
} from "../../hooks/worker/useWorkerProfile";
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
    FaHourglassHalf,
    FaCertificate,
    FaBriefcase,
} from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import WorkerProfileModals from "./modals/WorkerProfileModals";

export default function WorkerProfile() {
    const { data, isLoading } = useGetWorkerProfile();
    const profileRef = useRef(null);
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [verificationModalOpen, setVerificationModalOpen] = useState(false);
    const [verificationAction, setVerificationAction] = useState(null);

    const applyVerificationMutation = useApplyForVerification();
    const cancelVerificationMutation = useCancelVerification();

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

    useEffect(() => {
        // Inject blinking animation styles once
        if (!document.getElementById("blink-style")) {
            const style = document.createElement("style");
            style.id = "blink-style";
            style.innerHTML = `
                @keyframes blink {
                    50% { opacity: 0.4; }
                }
                .blink-green {
                    animation: blink 1s infinite;
                    background-color: #bbf7d0;
                    color: #166534;
                }
                .blink-red {
                    animation: blink 1s infinite;
                    background-color: #fecaca;
                    color: #991b1b;
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

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

    const isPendingVerification = profile.verificationRequest === true;

    const openVerificationModal = (action) => {
        setVerificationAction(action);
        setVerificationModalOpen(true);
    };

    const confirmVerificationAction = () => {
        const mutation =
            verificationAction === "apply"
                ? applyVerificationMutation
                : cancelVerificationMutation;
        mutation.mutate(null, {
            onSuccess: () => setVerificationModalOpen(false),
        });
    };

    const closeVerificationModal = () => setVerificationModalOpen(false);

    return (
        <div className="max-w-6xl mx-auto px-6 py-16 font-Inter min-h-screen space-y-10">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Worker CV</h1>
                <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 bg-[#FA5804] hover:bg-orange-600 text-white px-4 py-2 rounded-md shadow"
                >
                    <FaDownload /> Download CV
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-10" ref={profileRef}>
                {/* Left Profile Card */}
                <div className="md:w-1/3 bg-white rounded-xl border border-orange-100 shadow p-6 space-y-4 text-center">
                    {profilePic ? (
                        <img
                            src={profilePic}
                            alt="Profile"
                            className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-[#FA5804]/30"
                        />
                    ) : (
                        <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center bg-orange-100 text-[#FA5804] text-4xl">
                            <FaUser />
                        </div>
                    )}

                    <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
                    <p className="text-sm text-gray-500">{profile.role}</p>

                    <div className="flex justify-center gap-2 text-sm">
                        {profile.isVerified ? (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
                                <FaCheckCircle /> Verified
                            </span>
                        ) : isPendingVerification ? (
                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full flex items-center gap-1">
                                <FaHourglassHalf /> Pending
                            </span>
                        ) : (
                            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center gap-1">
                                <FaMinus /> Not Verified
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => setShowUpdateProfile(true)}
                            className="bg-[#FA5804] text-white rounded-md py-2 hover:bg-orange-600"
                        >
                            <FaEdit className="inline mr-2" /> Update Profile
                        </button>
                        <button
                            onClick={() => setShowChangePassword(true)}
                            className="bg-gray-700 text-white rounded-md py-2 hover:bg-black"
                        >
                            <FaLock className="inline mr-2" /> Change Password
                        </button>

                        {!profile.isVerified && !isPendingVerification && (
                            <button
                                onClick={() => openVerificationModal("apply")}
                                className="bg-yellow-500 text-white rounded-md py-2 hover:bg-yellow-600"
                            >
                                <FaHourglassHalf className="inline mr-2" /> Apply for Verification
                            </button>
                        )}

                        {!profile.isVerified && isPendingVerification && (
                            <button
                                onClick={() => openVerificationModal("cancel")}
                                className="bg-red-600 text-white rounded-md py-2 hover:bg-red-700"
                            >
                                <FaMinus className="inline mr-2" /> Cancel Verification
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Profile Info */}
                <div className="flex-1 space-y-8">
                    {/* Personal Info */}
                    <div className="bg-white p-6 rounded-xl shadow border border-orange-100 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Info</h3>
                        <div className="space-y-3 text-sm text-gray-700">
                            <p className="flex items-center gap-2">
                                <FaEnvelope className="text-[#FA5804]" />
                                <span><strong>Email:</strong> {profile.email}</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <FaPhoneAlt className="text-[#FA5804]" />
                                <span><strong>Phone:</strong> {profile.phone}</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-[#FA5804]" />
                                <span><strong>Location:</strong> {profile.location}</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <FaUser className="text-[#FA5804]" />
                                <span><strong>Username:</strong> {profile.username}</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <FaHourglassHalf className="text-[#FA5804]" />
                                <span><strong>Availability:</strong></span>
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-sm font-medium ${profile.availability ? "blink-green" : "blink-red"}`}>
                                    {profile.availability ? "Available" : "Not Available"}
                                </span>
                            </p>
                            <p className="flex items-center gap-2">
                                <FaCheckCircle className="text-[#FA5804]" />
                                <span><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</span>
                            </p>
                        </div>
                    </div>

                    {/* Profession and Certificate */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow border border-orange-100 space-y-2">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Profession</h3>
                            {profile.profession?.icon && (
                                <img
                                    src={getBackendImageUrl(profile.profession.icon)}
                                    alt="Profession Icon"
                                    className="w-10 h-10 object-contain mb-2"
                                />
                            )}
                            <p className="text-sm text-gray-700 flex items-center gap-2">
                                <FaBriefcase className="text-[#FA5804]" />
                                <span><strong>Profession:</strong> {profile.profession?.name || "Not specified"}</span>
                            </p>
                            <p className="text-sm text-gray-700 flex items-center gap-2">
                                <FaUser className="text-[#FA5804]" />
                                <span><strong>Category:</strong> {profile.profession?.category || "Not specified"}</span>
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow border border-orange-100 space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Certificate</h3>
                            {certificatePic ? (
                                <img
                                    src={certificatePic}
                                    alt="Certificate"
                                    className="w-full max-w-xs h-32 object-cover rounded border mx-auto"
                                />
                            ) : (
                                <p className="text-gray-500 italic text-sm flex items-center gap-2">
                                    <FaCertificate className="text-[#FA5804]" /> No certificate uploaded.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="bg-white p-6 rounded-xl shadow border border-orange-100 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skillsArray.length > 0 ? (
                                skillsArray.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="bg-orange-100 text-[#FA5804] text-sm px-3 py-1 rounded-full border border-orange-300"
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-500 text-sm italic">No skills listed.</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <WorkerProfileModals
                showUpdateProfile={showUpdateProfile}
                setShowUpdateProfile={setShowUpdateProfile}
                showChangePassword={showChangePassword}
                setShowChangePassword={setShowChangePassword}
            />

            {/* Verification Confirmation Modal */}
            {verificationModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-80 shadow-lg text-center">
                        <h3 className="text-lg font-semibold mb-4">
                            {verificationAction === "apply"
                                ? "Apply for Verification"
                                : "Cancel Verification Request"}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {verificationAction === "apply"
                                ? "Do you want to apply for verification?"
                                : "Do you want to cancel your verification request?"}
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={confirmVerificationAction}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                disabled={applyVerificationMutation.isLoading || cancelVerificationMutation.isLoading}
                            >
                                Yes
                            </button>
                            <button
                                onClick={closeVerificationModal}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                disabled={applyVerificationMutation.isLoading || cancelVerificationMutation.isLoading}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
