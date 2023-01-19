package com.example.demo1.util;

import org.springframework.stereotype.Component;

import com.example.demo1.domain.User;

@Component
public class AuthorityUtil {

	public static Boolean hasRole(String role, User user) {
		return user.getAuthorities().stream().filter(auth -> role.equals(auth.getAuthority())).count()>0;
	}
}
