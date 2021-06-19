SELECT
	{model} >= {threshold} AS model_decision,				
	decision AS user_decision,
	loan_status AS outcome
FROM review
LEFT JOIN applicant
	ON review.applicant_id = applicant.id
WHERE user_id = {user}
;