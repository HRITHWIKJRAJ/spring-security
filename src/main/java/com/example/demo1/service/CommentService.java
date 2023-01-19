package com.example.demo1.service;

import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo1.domain.Assignment;
import com.example.demo1.domain.Comment;
import com.example.demo1.domain.User;
import com.example.demo1.dto.CommentDto;
import com.example.demo1.repository.AssignmentRepository;
import com.example.demo1.repository.CommentRepository;

@Service
public class CommentService {

	@Autowired
    private CommentRepository commentRepo;
	
	@Autowired
    private AssignmentRepository assignmentRepo;


    public CommentService(CommentRepository commentRepo, AssignmentRepository assignmentRepo) {
        this.commentRepo = commentRepo;
        this.assignmentRepo = assignmentRepo;
    }

    public Comment save(CommentDto commentDto, User user) {
        Comment comment = new Comment();
        Optional<Assignment> assignment = assignmentRepo.findById(commentDto.getAssignmentId());
        
        comment.setId(commentDto.getId());
        comment.setAssignment(assignment.orElse(new Assignment()));
        comment.setText(commentDto.getText());
        comment.setCreatedBy(user);
        if (comment.getId() == null)
            comment.setCreatedDate(ZonedDateTime.now());
        else
            comment.setCreatedDate(commentDto.getCreatedDate());


        return commentRepo.save(comment);
    }

    public Set<Comment> getCommentsByAssignmentId(Long assignmentId) {
        Set<Comment> comments = commentRepo.findByAssignmentId(assignmentId);
        
        return comments;
    }

    public void delete(Long commentId) {
        commentRepo.deleteById(commentId);
        
    }

    
}
