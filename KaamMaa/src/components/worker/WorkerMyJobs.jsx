import React, { useState } from "react";
import classNames from "classnames";
import WorkerRequestedJobs from "./worker_job/WorkerRequestedJobs";
import WorkerAssignedJobs from "./worker_job/WorkerAssignedJobs";
import WorkerInProgressJob from "./worker_job/WorkerInProgressJob";
import WorkerCompletedJobs from "./worker_job/WorkerCompletedJobs";
import WorkerFailedJobs from "./worker_job/WorkerFailedJobs";

const tabs = [
    "Requested Jobs",
    "Assigned Jobs",
    "In Progress Jobs",
    "Completed Jobs",
    "Failed Jobs"
];

export default function WorkerMyJobs() {
    const [activeTab, setActiveTab] = useState("Requested Jobs");

    const renderTabContent = () => {
        switch (activeTab) {
            case "Requested Jobs":
                return <WorkerRequestedJobs />;
            case "Assigned Jobs":
                return <WorkerAssignedJobs />;
            case "In Progress Jobs":
                return <WorkerInProgressJob />;
            case "Completed Jobs":
                return <WorkerCompletedJobs />;
            case "Failed Jobs":
                return <WorkerFailedJobs />;
            default:
                return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Top Tabs */}
            <div className="border-b border-gray-300">
                <div className="flex text-gray-600 font-semibold text-sm sm:text-base">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={classNames(
                                "flex-1 text-center py-3 relative transition-colors duration-300",
                                activeTab === tab
                                    ? "text-[#FA5804]"
                                    : "hover:text-[#FA5804]"
                            )}
                        >
                            {tab}
                            {activeTab === tab && (
                                <span
                                    className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FA5804]"
                                    style={{ borderRadius: "2px 2px 0 0" }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="mt-8 min-h-[200px]">
                {renderTabContent()}
            </div>
        </div>
    );
}
