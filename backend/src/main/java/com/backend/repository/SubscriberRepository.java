package com.backend.repository;

import com.backend.entity.Language;
import com.backend.entity.Subscriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriberRepository extends JpaRepository<Subscriber, Long> {

    boolean existsByEmailAndPreferredLanguage(String email, Language preferredLanguage);


}
