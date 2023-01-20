package com.example.demo1.dto;

import java.util.HashSet;
import java.util.Set;

import com.example.demo1.domain.Assignment;
import com.example.demo1.enums.AssignmentEnum;
import com.example.demo1.enums.AssignmentStatusEnum;

public class AssignmentResponseDto {
	
	private Set<Assignment>  assignments = new HashSet<>();
	private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
	private AssignmentStatusEnum[] assignmentStatusEnums = AssignmentStatusEnum.values();
	
	public AssignmentResponseDto(Assignment assignment) {
		super();
		this.assignments.add(assignment);
	}
	public AssignmentResponseDto(Set<Assignment> assignments) {
		super();
		this.assignments = assignments;
	}
	
	public Set<Assignment> getAssignments() {
		return assignments;
	}
	public AssignmentEnum[] getAssignmentEnums() {
		return assignmentEnums;
	}

	public AssignmentStatusEnum[] getAssignmenStatusEnums() {
		return assignmentStatusEnums;
	}
	
	

}
