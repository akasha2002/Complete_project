import React from 'react'

export default function Assigned_work() {
    const assignedWorkDetails = {
        title: 'Title Assigned by Admin',
        description: 'Assignment description provided by admin goes here.',
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle assignment submission logic here
        console.log('Assignment submitted!');
    };

    return (
        <>
            <div className="container mt-2">
                <h2 className="mb-4">Assignment Submission</h2>

                {/* Display Assigned Work Details */}
                <div className="mb-4">
                    <h3>Assigned Title:</h3>
                    <p>{assignedWorkDetails.title}</p>
                    <h3>Assigned Description:</h3>
                    <p>{assignedWorkDetails.description}</p>
                </div>

                {/* Assignment Submission Form */}
                <form onSubmit={handleSubmit}>
                    {/* Assigned Title */}
                    <div className="mb-3">
                        <label htmlFor="assignedTitle" className="form-label">Assigned Title</label>
                        <input type="text" className="form-control" id="assignedTitle" value={assignedWorkDetails.title} readOnly />
                    </div>

                    {/* Assigned Description */}
                    <div className="mb-3">
                        <label htmlFor="assignedDescription" className="form-label">Assigned Description</label>
                        <textarea className="form-control" id="assignedDescription" rows="3" value={assignedWorkDetails.description} readOnly></textarea>
                    </div>

                    {/* Choose File */}
                    <div className="mb-3">
                        <label htmlFor="fileInput" className="form-label">Choose File</label>
                        <input type="file" className="form-control" id="fileInput" required />
                    </div>

                    {/* Upload Button */}
                    <div className="mb-3">
                        <button type="button" className="btn btn-primary">Upload File</button>
                    </div>

                    {/* Submit Button */}
                    <div className="mb-3">
                        <button type="submit" className="btn btn-success">Submit Assignment</button>
                    </div>
                </form>
            </div>
        </>
    );
}
