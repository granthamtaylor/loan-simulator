SELECT
  review.date,
	xgb,
  logit,
	decision,
	loan_status AS outcome,
  npv,
  CONCAT(applicant.first_name,' ', applicant.last_name) as applicant
FROM review
LEFT JOIN applicant
	ON review.applicant_id = applicant.id
WHERE user_id = {user}
ORDER BY review.date DESC
LIMIT 100
;