import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlumniById } from '../services/AlumniService.js';

const ContactAlumniComponent = () => {
    const { admno } = useParams();
    const [alumni, setAlumni] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        getAlumniById(admno)
            .then(response => {
                const data = response.data;
                setAlumni(data);

                // If image data exists, build a base64 data URL
                if (data.image_data && data.image_type) {
                    const base64Image = `data:${data.image_type};base64,${data.image_data}`;
                    setImageSrc(base64Image);
                }
            })
            .catch(error => {
                console.error("Error fetching alumni details:", error);
            });
    }, [admno]);

    return (
        <div className="container">
            <h2>Alumni Details</h2>
            {alumni ? (
                <div className="card p-4">
                    {/*<p><strong>Admission No:</strong> {alumni.admno}</p>*/}
                    <p><strong>First Name:</strong> {alumni.firstname}</p>
                    <p><strong>Last Name:</strong> {alumni.lastname}</p>
                    <p><strong>Email:</strong> {alumni.email}</p>
                    <p><strong>Contact No:</strong> {alumni.contact_no}</p>
                    <p><strong>Passing Year:</strong> {alumni.passout_year}</p>

                    {/* Show Image if available */}
                    {imageSrc && (
                        <div className="mt-3">
                            <img
                                src={imageSrc}
                                alt={`${alumni.firstname}'s Photo`}
                                style={{ width: "150px", borderRadius: "8px", border: "1px solid #ccc" }}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading alumni details...</p>
            )}
        </div>
    );
};

export default ContactAlumniComponent;
