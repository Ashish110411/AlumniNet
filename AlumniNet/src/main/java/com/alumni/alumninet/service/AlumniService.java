package com.alumni.alumninet.service;

import com.alumni.alumninet.dto.AlumniDto;

import java.util.List;

//public interface AlumniService {
//    AlumniDto createAlumni(AlumniDto alumniDto);
//
//    AlumniDto getAlumniById(String alumniId);
//
//    List<AlumniDto> getAllAlumni();
//
//    AlumniDto updateAlumni(String alumniId, AlumniDto updatedAlumni);
//
//    void deleteAlumni(String alumniId);
//}

public interface AlumniService {
    AlumniDto createAlumni(AlumniDto alumniDto);
    AlumniDto getAlumniById(String alumniId);
    List<AlumniDto> getAllAlumni();
    AlumniDto updateAlumni(String alumniId, AlumniDto updatedAlumni);
    void deleteAlumni(String alumniId);
}

