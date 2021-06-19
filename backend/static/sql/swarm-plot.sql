SELECT 
	CASE 
		WHEN loan_status = TRUE
			THEN '#00A69C'
		WHEN loan_status = FALSE
			THEN '#70110A'
		ELSE NULL
		END AS color,
	CASE
		WHEN decision = TRUE
			THEN 'Approved'
		WHEN decision = FALSE
			THEN 'Rejected'
		ELSE NULL
		END AS group,
	npv AS value,
	ROW_NUMBER () OVER (
				ORDER BY date
			) AS id
FROM review
LEFT JOIN applicant
	ON review.applicant_id = applicant.id
WHERE user_id = {user}
;