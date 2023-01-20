package com.example.demo1.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo1.domain.User;
import com.example.demo1.dto.UserRequestDto;
import com.example.demo1.service.UserService;

@RestController
@RequestMapping("api/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("register")
    public ResponseEntity<?> createUser(@RequestBody UserRequestDto request) {
		
		User newUser;
		try {
			newUser = userService.createUser(request);
			return ResponseEntity.ok(newUser);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
		
       
    }

}
