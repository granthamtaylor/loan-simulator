SELECT
	SUM(CASE WHEN decision = TRUE THEN npv END) AS user_value,
	SUM(CASE WHEN ({model} >= {threshold}) = TRUE THEN npv END) AS model_value
FROM review
LEFT JOIN applicant
	ON review.applicant_id = applicant.id
LEFT JOIN auth_user
	ON user_id = auth_user.id
WHERE user_id = {user}
;