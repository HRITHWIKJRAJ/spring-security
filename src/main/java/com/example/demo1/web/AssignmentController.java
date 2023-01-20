package com.example.demo1.web;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo1.domain.Assignment;
import com.example.demo1.domain.User;
import com.example.demo1.dto.AssignmentResponseDto;
import com.example.demo1.enums.AssignmentStatusEnum;
import com.example.demo1.enums.AuthoritiesEnum;
import com.example.demo1.service.AssignmentService;
import com.example.demo1.util.AuthorityUtil;

@RestController
@RequestMapping("api/assignments")
public class AssignmentController {

	@Autowired
	private AssignmentService assignmentService;
	
	@PostMapping("")
	public ResponseEntity<?> createAssignment( @AuthenticationPrincipal User user ){
		
		Assignment newAssignment = assignmentService.createAssignment(user);
		return ResponseEntity.ok(newAssignment);
		
	}
	
	@GetMapping("")
	public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user) {
		Set<Assignment> assignments = assignmentService.getAllAssignments(user);
		return ResponseEntity.ok(new AssignmentResponseDto( assignments ));
	}
	
	@GetMapping("{assignmentId}")
	public ResponseEntity<?> getAssignemt(@PathVariable Long assignmentId, @AuthenticationPrincipal User user){
		Optional<Assignment> assignmentOpt = assignmentService.getAssignment(assignmentId);
		return ResponseEntity.ok(new AssignmentResponseDto( assignmentOpt.orElse(new Assignment())));
		
	}
	
	@PutMapping("{assignmentId}")
	public ResponseEntity<?> updateAssignment(@PathVariable Long assignmentId, @AuthenticationPrincipal User user, @RequestBody Assignment assignment){
		
		if (AuthorityUtil.hasRole(AuthoritiesEnum.ROLE_CODE_REVIEWER.name(), user)) {
			assignment.setCodeReviewer(user);
		}
		Assignment updatedAssignment = assignmentService.updateAssignment(assignment);
		return ResponseEntity.ok(updatedAssignment);
	}
}
