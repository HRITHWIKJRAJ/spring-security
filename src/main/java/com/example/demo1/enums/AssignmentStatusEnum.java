package com.example.demo1.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentStatusEnum {

	PENDING_SUBMISSION(1,"Pending Submission"),
	SUBMITTED(2,"Submitted"),
	IN_REVIEW(3,"In Review"),
	NEEDS_UPDATE(4,"Needs Update"),
	RESUBMITTED(5,"Re-Submitted"),
	COMPLETED(6,"Completed");
	
	private Integer stage;
	private String status;
	private AssignmentStatusEnum(Integer stage , String status) {
		this.status = status;
		this.stage = stage;
	}
	
	public String getStatus() {
		return status;
	}
	public Integer getStage() {
		return stage;
	}
	
	
}
