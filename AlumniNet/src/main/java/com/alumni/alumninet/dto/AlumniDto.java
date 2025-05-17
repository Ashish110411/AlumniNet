package com.alumni.alumninet.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AlumniDto {
    private String admno;
    private String firstname;
    private String lastname;
    private String email;
    private String contact_no;
    private String passout_year;
}
