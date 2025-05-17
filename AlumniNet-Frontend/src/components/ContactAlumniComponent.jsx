import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlumniById } from '../services/AlumniService.js';

const ContactAlumniComponent = () => {
    const { id } = useParams();
    const [alumni, setAlumni] = useState(null);

    useEffect(() => {
        getAlumniById(id).then(response => {
            setAlumni(response.data);
        }).catch(error => {
            console.error("Error fetching alumni details:", error);
        });
    }, [id]);

    return (
        <div className="container">
            <h2>Alumni Details</h2>
            {alumni ? (
                <div className="card p-4">
                    <p><strong>Admission No:</strong> {alumni.id}</p>
                    <p><strong>First Name:</strong> {alumni.firstname}</p>
                    <p><strong>Last Name:</strong> {alumni.lastname}</p>
                    <p><strong>Email:</strong> {alumni.email}</p>
                    <p><strong>Contact No:</strong> {alumni.contact_no}</p>
                    <p><strong>Passing Year:</strong> {alumni.passout_year}</p>
                </div>
            ) : (
                <p>Loading alumni details...</p>
            )}
        </div>
    );
};

export default ContactAlumniComponent;
