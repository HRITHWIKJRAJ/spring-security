package com.example.demo1.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentEnum {
	ASSIGNMENT_1(1,"HTML"),
	ASSIGNMENT_2(2,"SPRING"),
	ASSIGNMENT_3(3,"REACT"),
	ASSIGNMENT_4(4,"JAVA"),
	ASSIGNMENT_5(5,"CSS");
	
	private int assignmentNum;
	private String assignmentName;
	
	private AssignmentEnum(int assignmentNum, String assignmentName) {
		this.assignmentNum = assignmentNum;
		this.assignmentName = assignmentName;
	}
	public int getAssignmentNum() {
		return assignmentNum;
	}
	public String getAssignmentName() {
		return assignmentName;
	}
	
	

}
