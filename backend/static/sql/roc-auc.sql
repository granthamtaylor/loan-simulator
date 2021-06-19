SELECT
	{model} AS prediction,
	loan_status AS outcome
FROM review
LEFT JOIN applicant
	ON review.applicant_id = applicant.id
WHERE user_id = {user}
;