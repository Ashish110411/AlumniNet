//package com.alumni.alumninet.controller;
//
//import com.alumni.alumninet.dto.AlumniDto;
//import com.alumni.alumninet.service.AlumniService;
//import lombok.AllArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@AllArgsConstructor
//@RequestMapping("/api/alumni")
//public class AlumniController {
//
//    private AlumniService alumniService;
//
//    //Build Add Employee REST API
//    @PostMapping
//    public ResponseEntity<AlumniDto> createAlumni(@RequestBody AlumniDto alumniDto) {
//        AlumniDto savedAlumni = alumniService.createAlumni(alumniDto);
//        return new ResponseEntity<>(savedAlumni, HttpStatus.CREATED);
//    }
//
//    // Get alumni REST API
//    @GetMapping("/{id}")
//    public ResponseEntity<AlumniDto> getAlumniById(@PathVariable("id") Long alumniId) {
//        AlumniDto alumniDto = alumniService.getAlumniById(alumniId);
//        return ResponseEntity.ok(alumniDto);
//    }
//
//    // Get all alumni REST API
//    @GetMapping
//    public ResponseEntity<List<AlumniDto>> getAllAlumni() {
//        List<AlumniDto> alumniDtos = alumniService.getAllAlumni();
//        return ResponseEntity.ok(alumniDtos);
//    }
//
//    // Update Alumni REST API
//    @PutMapping("/{id}")
//    public ResponseEntity<AlumniDto> updateAlumni(@PathVariable("id") Long alumniId, @RequestBody AlumniDto updatedAlumni) {
//        AlumniDto alumniDto = alumniService.updateAlumni(alumniId, updatedAlumni);
//        return ResponseEntity.ok(alumniDto);
//    }
//
//    // Delete Alumni REST API
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteAlumni(@PathVariable("id") Long alumniId) {
//        alumniService.deleteAlumni(alumniId);
//        return ResponseEntity.ok("Alumni with Admission No: "+ alumniId +" Deleted Successfully");
//    }
//}

package com.alumni.alumninet.controller;

import com.alumni.alumninet.dto.AlumniDto;
import com.alumni.alumninet.service.AlumniService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/alumni")
public class AlumniController {

    private AlumniService alumniService;

    // Build Add Alumni REST API
    @PostMapping
    public ResponseEntity<AlumniDto> createAlumni(@RequestBody AlumniDto alumniDto) {
        AlumniDto savedAlumni = alumniService.createAlumni(alumniDto);
        return new ResponseEntity<>(savedAlumni, HttpStatus.CREATED);
    }

    // Get Alumni REST API by ADMN No
    @GetMapping("/{admno}")
    public ResponseEntity<AlumniDto> getAlumniById(@PathVariable("admno") String alumniId) {
        AlumniDto alumniDto = alumniService.getAlumniById(alumniId);
        return ResponseEntity.ok(alumniDto);
    }

    // Get all Alumni REST API
    @GetMapping
    public ResponseEntity<List<AlumniDto>> getAllAlumni() {
        List<AlumniDto> alumniDtos = alumniService.getAllAlumni();
        return ResponseEntity.ok(alumniDtos);
    }

    // Update Alumni REST API
    @PutMapping("/{admno}")
    public ResponseEntity<AlumniDto> updateAlumni(@PathVariable("admno") String alumniId,
                                                  @RequestBody AlumniDto updatedAlumni) {
        AlumniDto alumniDto = alumniService.updateAlumni(alumniId, updatedAlumni);
        return ResponseEntity.ok(alumniDto);
    }

    // Delete Alumni REST API
    @DeleteMapping("/{admno}")
    public ResponseEntity<String> deleteAlumni(@PathVariable("admno") String alumniId) {
        alumniService.deleteAlumni(alumniId);
        return ResponseEntity.ok("Alumni with Admission No: " + alumniId + " Deleted Successfully");
    }
}
