package com.alumni.alumninet.service;

import com.alumni.alumninet.dto.AlumniDto;
import com.alumni.alumninet.entity.Alumni;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AlumniService {
    AlumniDto createAlumni(AlumniDto alumniDto);
    AlumniDto getAlumniById(String alumniId);
    List<AlumniDto> getAllAlumni();
    AlumniDto updateAlumni(String alumniId, AlumniDto updatedAlumni);
    void deleteAlumni(String alumniId);
    AlumniDto addPic(AlumniDto alumni, MultipartFile imageFile) throws IOException;

}

