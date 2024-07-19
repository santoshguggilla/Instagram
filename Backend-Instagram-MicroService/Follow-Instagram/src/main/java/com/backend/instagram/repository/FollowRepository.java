package com.backend.instagram.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.instagram.model.Follow;

public interface FollowRepository extends JpaRepository<Follow, Integer> {

	Follow findByFollowerIdAndFolloweeId(int followingId, int followeeId);

	Set<Follow> findByFollowerId(int followingId);

	Set<Follow> findByFolloweeId(int followeeId);

}
