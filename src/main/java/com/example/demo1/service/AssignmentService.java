package com.example.demo1.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo1.domain.Assignment;
import com.example.demo1.domain.User;
import com.example.demo1.enums.AssignmentStatusEnum;
import com.example.demo1.enums.AuthoritiesEnum;
import com.example.demo1.repository.AssignmentRepository;
import com.example.demo1.util.AuthorityUtil;

@Service
public class AssignmentService {

	@Autowired
	private AssignmentRepository assignmentRepo;

	public Assignment createAssignment(User user) {

		Assignment assignment = new Assignment();
		assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
		assignment.setUser(user);
		assignment.setNumber(findAssignmentNumber(user));

		return assignmentRepo.save(assignment);
	}

	private Integer findAssignmentNumber(User user) {

		return (int) assignmentRepo.findByUser(user).stream().count() + 1;
	}

	public Set<Assignment> getAllAssignments(User user) {

		if (AuthorityUtil.hasRole(AuthoritiesEnum.ROLE_CODE_REVIEWER.name(), user)) {
			return assignmentRepo.findByCodeReviewer(user);
		}

		return assignmentRepo.findByUser(user);
	}

	public Optional<Assignment> getAssignment(Long assignmentId) {
		Optional<Assignment> assignment = assignmentRepo.findById(assignmentId);
		return assignment;
	}

	public Assignment updateAssignment(Assignment assignment) {
		return assignmentRepo.save(assignment);
	}

}
