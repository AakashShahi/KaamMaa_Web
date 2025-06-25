import React, { useState, useMemo } from "react";
import { useWorkerReviews, useDeleteWorkerReview } from "../../hooks/worker/useReview";
import { getBackendImageUrl } from "../../utils/backend_image";
import { FaTrash, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function WorkerReviews() {
    const [page, setPage] = useState(1);
    const [selectedReviewId, setSelectedReviewId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const limit = 10;

    const { reviews, isLoading, isError, pagination } = useWorkerReviews({ page, limit });
    const { mutate: deleteReview, isLoading: isDeleting } = useDeleteWorkerReview();

    const openModal = (reviewId) => {
        setSelectedReviewId(reviewId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedReviewId(null);
        setIsModalOpen(false);
    };

    const confirmDelete = () => {
        if (selectedReviewId) {
            deleteReview(selectedReviewId);
        }
        closeModal();
    };

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (page < pagination.totalPages) setPage((prev) => prev + 1);
    };

    // ✅ Calculate average rating
    const averageRating = useMemo(() => {
        if (!reviews.length) return 0;
        const total = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
        return total / reviews.length;
    }, [reviews]);

    // ✅ Render star rating
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalf = rating - fullStars >= 0.5;

        for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
        if (hasHalf) stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
        while (stars.length < 5) stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-yellow-400" />);

        return <div className="flex gap-1">{stars}</div>;
    };

    if (isLoading) return <div className="p-4 text-center">Loading reviews...</div>;
    if (isError) return <div className="p-4 text-center text-red-500">Failed to load reviews.</div>;
    if (reviews.length === 0) return <div className="p-4 text-center">No reviews found.</div>;

    return (
        <div className="p-4">
            {/* ✅ Overall Average Rating */}
            <div className="flex items-center justify-center mb-6">
                <div className="flex items-center gap-2 text-2xl font-semibold">
                    Overall Rating: {averageRating.toFixed(1)}
                    <div className="text-2xl">{renderStars(averageRating)}</div>
                </div>
            </div>

            {/* Reviews Grid */}
            <h2 className="text-xl font-semibold mb-4">My Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map((review) => (
                    <div
                        key={review._id}
                        className="bg-white shadow rounded-lg p-4 flex flex-col justify-between border relative"
                    >
                        {/* Job Icon */}
                        {review.jobId?.icon && (
                            <img
                                src={getBackendImageUrl(review.jobId.icon)}
                                alt="Job Icon"
                                className="w-12 h-12 object-contain mb-2"
                            />
                        )}

                        {/* Review Content */}
                        <div className="flex-1">
                            <p className="text-gray-700 mb-2 italic">"{review.comment}"</p>

                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Job:</strong> {review.jobId?.description}
                            </p>

                            <p className="text-sm text-gray-500 mb-1">
                                <strong>Customer:</strong> {review.customerId?.name}
                            </p>
                            <p className="text-sm text-gray-500 mb-1">
                                <strong>Location:</strong> {review.jobId?.location}
                            </p>
                            <p className="text-sm text-gray-500 mb-1">
                                <strong>Date:</strong> {new Date(review.jobId?.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500 mb-2">
                                <strong>Time:</strong> {review.jobId?.time}
                            </p>

                            {/* ⭐ Rating Stars */}
                            {review.rating !== undefined && (
                                <div className="flex items-center gap-1">
                                    {renderStars(review.rating)}
                                    <span className="text-sm text-gray-600">({review.rating})</span>
                                </div>
                            )}
                        </div>

                        {/* Delete Button */}
                        <button
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            onClick={() => openModal(review._id)}
                            disabled={isDeleting}
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="text-sm text-gray-600">
                    Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={page === pagination.totalPages}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Delete Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-80 shadow-lg text-center">
                        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this review?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
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
