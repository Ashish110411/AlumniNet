//package com.alumni.alumninet.service.impl;
//
//import com.alumni.alumninet.dto.AlumniDto;
//import com.alumni.alumninet.entity.Alumni;
//import com.alumni.alumninet.exception.ResourceNotFoundException;
//import com.alumni.alumninet.mapper.AlumniMapper;
//import com.alumni.alumninet.repository.AlumniRepository;
//import com.alumni.alumninet.service.AlumniService;
//import lombok.AllArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//
//@Service
//@AllArgsConstructor
//public class AlumniServiceImpl implements AlumniService {
//
//    private AlumniRepository alumniRepository;
//
//    @Override
//    public AlumniDto createAlumni(AlumniDto alumniDto) {
//
//        Alumni alumni = AlumniMapper.mapToAlumni(alumniDto);
//        Alumni savedAlumni = alumniRepository.save(alumni);
//        return AlumniMapper.mapToAlumniDto(savedAlumni);
//    }
//
//    @Override
//    public AlumniDto getAlumniById(Long alumniId) {
//        Alumni alumni = alumniRepository.findById(alumniId)
//                .orElseThrow(() ->
//                        new ResourceNotFoundException("Alumni not found for this id :: " + alumniId));
//        return AlumniMapper.mapToAlumniDto(alumni);
//    }
//
//    @Override
//    public List<AlumniDto> getAllAlumni() {
//        List<Alumni> alumnis = alumniRepository.findAll();
//        return alumnis.stream().map((alumni) -> AlumniMapper.mapToAlumniDto(alumni)).collect(Collectors.toList());
//    }
//
//    @Override
//    public AlumniDto updateAlumni(Long alumniId, AlumniDto updatedAlumni) {
//        Alumni alumni = alumniRepository.findById(alumniId).orElseThrow(
//                () -> new ResourceNotFoundException("Alumni not found for this id :: " + alumniId)
//        );
//
//        alumni.setFirstname(updatedAlumni.getFirstname());
//        alumni.setLastname(updatedAlumni.getLastname());
//        alumni.setEmail(updatedAlumni.getEmail());
//        alumni.setContact_no(updatedAlumni.getContact_no());
//        alumni.setPassout_year(updatedAlumni.getPassout_year());
//
//        Alumni updatedAlumniObj = alumniRepository.save(alumni);
//        return AlumniMapper.mapToAlumniDto(updatedAlumniObj);
//    }
//
//    @Override
//    public void deleteAlumni(Long alumniId) {
//        Alumni alumni = alumniRepository.findById(alumniId).orElseThrow(
//                () -> new ResourceNotFoundException("Alumni not found for this id :: " + alumniId)
//        );
//
//        alumniRepository.deleteById( alumniId);
//    }
//}


package com.alumni.alumninet.service.impl;

import com.alumni.alumninet.dto.AlumniDto;
import com.alumni.alumninet.entity.Alumni;
import com.alumni.alumninet.exception.ResourceNotFoundException;
import com.alumni.alumninet.mapper.AlumniMapper;
import com.alumni.alumninet.repository.AlumniRepository;
import com.alumni.alumninet.service.AlumniService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AlumniServiceImpl implements AlumniService {

    private AlumniRepository alumniRepository;

    @Override
    public AlumniDto createAlumni(AlumniDto alumniDto) {
        Alumni alumni = AlumniMapper.mapToAlumni(alumniDto);
        Alumni savedAlumni = alumniRepository.save(alumni);
        return AlumniMapper.mapToAlumniDto(savedAlumni);
    }

    @Override
    public AlumniDto getAlumniById(String alumniId) {
        Alumni alumni = alumniRepository.findById(alumniId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Alumni not found for this Admission No: " + alumniId));
        return AlumniMapper.mapToAlumniDto(alumni);
    }

    @Override
    public List<AlumniDto> getAllAlumni() {
        List<Alumni> alumnis = alumniRepository.findAll();
        return alumnis.stream()
                .map(AlumniMapper::mapToAlumniDto)
                .collect(Collectors.toList());
    }

    @Override
    public AlumniDto updateAlumni(String alumniId, AlumniDto updatedAlumni) {
        Alumni alumni = alumniRepository.findById(alumniId).orElseThrow(
                () -> new ResourceNotFoundException("Alumni not found for this Admission No: " + alumniId)
        );

        alumni.setFirstname(updatedAlumni.getFirstname());
        alumni.setLastname(updatedAlumni.getLastname());
        alumni.setEmail(updatedAlumni.getEmail());
        alumni.setContact_no(updatedAlumni.getContact_no());
        alumni.setPassout_year(updatedAlumni.getPassout_year());

        Alumni updatedAlumniObj = alumniRepository.save(alumni);
        return AlumniMapper.mapToAlumniDto(updatedAlumniObj);
    }

    @Override
    public void deleteAlumni(String alumniId) {
        Alumni alumni = alumniRepository.findById(alumniId).orElseThrow(
                () -> new ResourceNotFoundException("Alumni not found for this Admission No: " + alumniId)
        );

        alumniRepository.deleteById(alumniId);
    }
}
