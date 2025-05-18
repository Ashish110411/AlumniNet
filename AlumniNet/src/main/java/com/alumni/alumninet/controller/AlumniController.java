package com.alumni.alumninet.controller;

import com.alumni.alumninet.dto.AlumniDto;
import com.alumni.alumninet.service.AlumniService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/alumni")
public class AlumniController {



    private final AlumniService alumniService;

    @PostMapping
    public ResponseEntity<AlumniDto> addAlumni(
            @RequestParam String admno,
            @RequestParam String firstname,
            @RequestParam String lastname,
            @RequestParam String email,
            @RequestParam String contact_no,
            @RequestParam String passout_year,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile
    ) throws IOException {
        AlumniDto alumniDto = new AlumniDto(admno, firstname, lastname, email, contact_no, passout_year, null, null, null);

        if (imageFile != null && !imageFile.isEmpty()) {
            alumniDto.setImage_name(imageFile.getOriginalFilename());
            alumniDto.setImage_type(imageFile.getContentType());
            alumniDto.setImage_data(imageFile.getBytes());
        }

        AlumniDto saved = alumniService.createAlumni(alumniDto);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/{admno}")
    public ResponseEntity<AlumniDto> getAlumniById(@PathVariable("admno") String alumniId) {
        AlumniDto alumniDto = alumniService.getAlumniById(alumniId);
        return ResponseEntity.ok(alumniDto);
    }

    @GetMapping
    public ResponseEntity<List<AlumniDto>> getAllAlumni() {
        List<AlumniDto> alumniDtos = alumniService.getAllAlumni();
        return ResponseEntity.ok(alumniDtos);
    }

    @PutMapping("/upload-pic/{admno}")
    public ResponseEntity<AlumniDto> updateAlumniWithImage(
            @PathVariable String admno,
            @RequestParam String firstname,
            @RequestParam String lastname,
            @RequestParam String email,
            @RequestParam String contact_no,
            @RequestParam String passout_year,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile,
            @RequestParam(value = "removeImage", required = false, defaultValue = "false") boolean removeImage
    ) throws IOException {

        System.out.println("removeImage flag received: " + removeImage);
        System.out.println("imageFile is null: " + (imageFile == null));

        AlumniDto updatedAlumni = new AlumniDto(
                admno, firstname, lastname, email, contact_no, passout_year, null, null, null
        );

        if (imageFile != null && !imageFile.isEmpty()) {
            updatedAlumni.setImage_name(imageFile.getOriginalFilename());
            updatedAlumni.setImage_type(imageFile.getContentType());
            updatedAlumni.setImage_data(imageFile.getBytes());
        }

        if (removeImage) {
            updatedAlumni.setImage_name(null);
            updatedAlumni.setImage_type(null);
            updatedAlumni.setImage_data(null);
        }
//        AlumniDto saved = alumniService.updateAlumni(admno, updatedAlumni, removeImage);
//        AlumniDto saved = alumniService.updateAlumni(admno, updatedAlumni);
        AlumniDto saved = alumniService.updateAlumni(admno, updatedAlumni, removeImage);

        return new ResponseEntity<>(saved, HttpStatus.OK);
    }

    @DeleteMapping("/{admno}")
    public ResponseEntity<String> deleteAlumni(@PathVariable("admno") String alumniId) {
        alumniService.deleteAlumni(alumniId);
        return ResponseEntity.ok("Alumni with Admission No: " + alumniId + " deleted successfully.");
    }

    @GetMapping("/{admno}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable("admno") String admno) {
        AlumniDto alumni = alumniService.getAlumniById(admno);
        byte[] imageFile = alumni.getImage_data();

        if (imageFile == null || alumni.getImage_type() == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(alumni.getImage_type()))
                .body(imageFile);
    }
}
