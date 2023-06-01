package hac.repo;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Interface for handling with the purchases' db.
 */
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
}
