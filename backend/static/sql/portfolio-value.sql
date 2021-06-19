WITH portfolio_sample AS (
	SELECT 
		ROW_NUMBER () OVER (
				ORDER BY date
			) AS index,
		SUM(npv) OVER (
			ORDER BY date 
			ROWS BETWEEN 
				UNBOUNDED PRECEDING and CURRENT ROW
			) AS portfolio
	FROM review
	LEFT JOIN applicant
		ON review.applicant_id = applicant.id
	WHERE user_id = {user}
		AND decision = TRUE
	ORDER BY RANDOM()
	LIMIT 200
)
SELECT 
	index AS x,
	portfolio AS y
FROM portfolio_sample
ORDER BY index
;