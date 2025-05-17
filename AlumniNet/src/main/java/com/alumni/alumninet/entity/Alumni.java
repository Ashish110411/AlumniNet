package com.alumni.alumninet.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "alumni_user")
public class Alumni {
    @Id
    @Column(name = "Admission_No")
    private String admno;
    @Column(name = "First_Name")
    private String firstname;
    @Column(name = "Last_Name")
    private String lastname;
    @Column(name = "Email", nullable = false, unique = true)
    private String email;
//    private String password;
    @Column(name = "Contact_No", nullable = false, unique = true)
    private String contact_no;
    private String passout_year;
    private String image_name;
    private String image_type;
    @Lob
    private byte[] image_data;

}
