package com.example.demo1.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Assignment {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Integer number;
	private String status;
	private String githubUrl;
	private String Branch;
	private String codeReviewVideoUrl;
	
	@ManyToOne(optional = false)
	private User user;
	
	@ManyToOne
	private User codeReviewer;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Integer getNumber() {
		return number;
	}
	public void setNumber(Integer number) {
		this.number = number;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getGithubUrl() {
		return githubUrl;
	}
	public void setGithubUrl(String githubUrl) {
		this.githubUrl = githubUrl;
	}
	public String getBranch() {
		return Branch;
	}
	public void setBranch(String branch) {
		Branch = branch;
	}
	public String getCodeReviewVideoUrl() {
		return codeReviewVideoUrl;
	}
	public void setCodeReviewVideoUrl(String codeReviewVideoUrl) {
		this.codeReviewVideoUrl = codeReviewVideoUrl;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public User getCodeReviewer() {
		return codeReviewer;
	}
	public void setCodeReviewer(User codeReviewer) {
		this.codeReviewer = codeReviewer;
	}

}
