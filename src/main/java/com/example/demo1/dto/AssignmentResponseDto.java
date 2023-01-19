package com.example.demo1.dto;

import com.example.demo1.domain.Assignment;
import com.example.demo1.enums.AssignmentEnum;
import com.example.demo1.enums.AssignmentStatusEnum;

public class AssignmentResponseDto {
	
	private Assignment  assignment;
	private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
	private AssignmentStatusEnum[] assignmentStatusEnums = AssignmentStatusEnum.values();
	
	public AssignmentResponseDto(Assignment assignment) {
		super();
		this.assignment = assignment;
	}
	
	public Assignment getAssignment() {
		return assignment;
	}
	public AssignmentEnum[] getAssignmentEnums() {
		return assignmentEnums;
	}

	public AssignmentStatusEnum[] getAssignmenStatusEnums() {
		return assignmentStatusEnums;
	}
	
	

}
