import React from 'react';


export default function AccountRequestViewer() {

    const handleApproveRequest = () => {
    };

    const handleDenyRequest = () => {
    };

    return (
        <div>
            <h1>Account Request Viewer</h1>
            <br />
            <br />

            <div>
                <label>First Name:</label>
                <br />
                {/* <p>{request.firstname}</p> */}
                <br />
                <label>Last Name:</label>
                <br />
                {/* <p>{request.lastname}</p> */}
                <br />
                <label>Purpose For Account:</label>
                <br />
                {/* <p>{request.remarks}</p> */}
                <br />
                <button onClick={handleApproveRequest}>Approve</button>
                <button onClick={handleDenyRequest}>Deny</button>
            </div>
        </div>
    )
}