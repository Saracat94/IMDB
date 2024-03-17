package com.sideagroup.accademy.repository;

import com.sideagroup.accademy.model.Celebrity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CelebrityRepository extends JpaRepository<Celebrity, String> {
    public Page<Celebrity> findByPrimaryNameIgnoreCaseContaining(String name, Pageable pageable);

}
