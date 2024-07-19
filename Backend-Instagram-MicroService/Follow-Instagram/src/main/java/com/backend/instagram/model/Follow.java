package com.backend.instagram.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Follow {

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private int followerId;
	private int followeeId;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getFollowerId() {
		return followerId;
	}
	public void setFollowerId(int followerId) {
		this.followerId = followerId;
	}
	public int getFolloweeId() {
		return followeeId;
	}
	public void setFolloweeId(int followeeId) {
		this.followeeId = followeeId;
	}
	
}
