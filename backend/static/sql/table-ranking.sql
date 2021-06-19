SELECT 
  COALESCE(SUM(applicant.npv), 0) as portfolio_value,
  COALESCE(AVG(applicant.npv), 0) as avg_value,
  COALESCE(COUNT(applicant.npv), 0) as n_reviews,
  auth_user.first_name AS first_name,
  auth_user.last_name AS last_name,
  auth_user.username AS username,
  auth_user.id AS id,
  auth_user.email AS email
FROM auth_user
FULL OUTER JOIN review
  ON review.user_id = auth_user.id
LEFT JOIN applicant
  ON review.applicant_id = applicant.id
WHERE review.decision = TRUE
GROUP BY auth_user.id
ORDER BY portfolio_value DESC
LIMIT 10;