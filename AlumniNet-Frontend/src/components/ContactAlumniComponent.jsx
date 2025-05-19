import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlumniById, deleteAlumni } from '../services/AlumniService.js';

const ContactAlumniComponent = () => {
    const { admno } = useParams();
    const navigate = useNavigate();
    const [alumni, setAlumni] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        getAlumniById(admno)
            .then(response => {
                const data = response.data;
                setAlumni(data);

                if (data.image_data && data.image_type) {
                    const base64Image = `data:${data.image_type};base64,${data.image_data}`;
                    setImageSrc(base64Image);
                }
            })
            .catch(error => {
                console.error("Error fetching alumni details:", error);
            });
    }, [admno]);

    function removeAlumni(admno) {
        const userInput = prompt("Enter Admission Number to confirm deletion:");
        if (userInput === admno.toString()) {
            deleteAlumni(admno)
                .then(() => {
                    alert("Alumni deleted successfully.");
                    navigate("/alumni");
                })
                .catch(error => {
                    console.error(error);
                    alert("Error deleting alumni.");
                });
        } else {
            alert("Admission Number does not match. Deletion canceled.");
        }
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center">Alumni Details</h2>
            {alumni ? (
                <div className="card bg-body-secondary text-body p-4 shadow-sm">
                    <div className="row align-items-center">
                        {/* Left Column: Text Details */}
                        <div className="col-md-8">
                            <p><strong>First Name:</strong> {alumni.firstname}</p>
                            <p><strong>Last Name:</strong> {alumni.lastname}</p>
                            <p><strong>Email:</strong> {alumni.email}</p>
                            <p><strong>Contact No:</strong> {alumni.contact_no}</p>
                            <p><strong>Passing Year:</strong> {alumni.passout_year}</p>

                            <div className="mt-4">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => removeAlumni(admno)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Image */}
                        {imageSrc && (
                            <div className="col-md-4 text-center">
                                <img
                                    src={imageSrc}
                                    alt={`${alumni.firstname}'s Photo`}
                                    className="img-fluid rounded shadow"
                                    style={{ maxWidth: "180px" }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading alumni details...</p>
            )}
        </div>
    );

};

export default ContactAlumniComponent;
