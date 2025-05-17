package com.alumni.alumninet.mapper;

import com.alumni.alumninet.dto.AlumniDto;
import com.alumni.alumninet.entity.Alumni;

public class AlumniMapper {
    public static AlumniDto mapToAlumniDto(Alumni alumni) {
        return new AlumniDto(
                alumni.getAdmno(),
                alumni.getFirstname(),
                alumni.getLastname(),
                alumni.getEmail(),
                alumni.getContact_no(),
                alumni.getPassout_year()
        );
    }

    public static Alumni mapToAlumni(AlumniDto alumniDto) {
        return new Alumni(
                alumniDto.getAdmno(),
                alumniDto.getFirstname(),
                alumniDto.getLastname(),
                alumniDto.getEmail(),
                alumniDto.getContact_no(),
                alumniDto.getPassout_year()
        );
    }
}
