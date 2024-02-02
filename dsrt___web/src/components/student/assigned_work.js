import React from 'react'

export default function Assigned_work() {
    return (
        <>
            <div class="container mt-5">
                <h2 class="mb-4">Assignment Submission</h2>

                <form>
                    {/* <!-- Assigned Title --> */}
                    <div class="mb-3">
                        <label for="assignedTitle" class="form-label">Assigned Title</label>
                        <input type="text" class="form-control" id="assignedTitle" value="Title Assigned by Admin" readonly/>
                    </div>

                    {/* <!-- Assigned Description --> */}
                    <div class="mb-3">
                        <label for="assignedDescription" class="form-label">Assigned Description</label>
                        <textarea class="form-control" id="assignedDescription" rows="3" readonly>Assignment description provided by admin goes here.</textarea>
                    </div>

                    {/* <!-- Choose File --> */}
                    <div class="mb-3">
                        <label for="fileInput" class="form-label">Choose File</label>
                        <input type="file" class="form-control" id="fileInput" required/>
                    </div>

                    {/* <!-- Upload Button --> */}
                    <div class="mb-3">
                        <button type="button" class="btn btn-primary">Upload File</button>
                    </div>

                    {/* <!-- Submit Button --> */}
                    <div class="mb-3">
                        <button type="submit" class="btn btn-success">Submit Assignment</button>
                    </div>
                </form>
            </div>
        </>
    )
}
