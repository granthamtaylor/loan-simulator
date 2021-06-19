SELECT 
	COUNT(*) AS n_reviewed,
	SUM(decision::int) AS n_approved,
	SUM((decision::int) * (loan_status::int)) AS n_repaid
FROM review
LEFT JOIN applicant
	ON review.applicant_id = applicant.id
WHERE user_id = {user}
;