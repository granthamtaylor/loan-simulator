SELECT
	auth_user.first_name,
	auth_user.last_name,
	SUM(decision::int) AS n_approved,
	SUM((NOT decision)::int) AS n_rejected,
	COUNT(*) AS n_reviewed,
	SUM(CASE WHEN decision = TRUE THEN npv END) AS value_sum,
	AVG(CASE WHEN decision = TRUE THEN npv END) AS value_avg
FROM review
LEFT JOIN applicant
	ON review.applicant_id = applicant.id
LEFT JOIN auth_user
	ON user_id = auth_user.id
WHERE user_id = {user}
GROUP BY 
	auth_user.username,
	auth_user.first_name,
	auth_user.last_name
;