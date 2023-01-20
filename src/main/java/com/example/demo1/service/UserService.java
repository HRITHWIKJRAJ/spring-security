package com.example.demo1.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo1.domain.Authority;
import com.example.demo1.domain.User;
import com.example.demo1.dto.UserRequestDto;
import com.example.demo1.repository.AuthorityRepository;
import com.example.demo1.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepo;

	@Autowired 
	AuthorityRepository authorityRepo;
	
	public User createUser(UserRequestDto request) throws Exception {
		
		User newUser = new User();
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		
		if (userRepo.findByUsername(request.getUsername()).isEmpty()) {			
			
			newUser.setName(request.getName());
			newUser.setUsername(request.getUsername());
			newUser.setPassword(passwordEncoder.encode(request.getPassword()));
			newUser.setCohortStartDate(LocalDate.now());
			
			userRepo.save(newUser);
			
			Authority authority = new Authority();
			authority.setAuthority("ROLE_STUDENT");
			authority.setUser(newUser);
			authorityRepo.save(authority);
		} else {
			throw new Exception("User Already Exists");
		}
		
		return newUser;
	}

}
