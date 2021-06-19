SELECT * 
FROM applicant
WHERE id NOT IN (
  SELECT applicant_id
  FROM review
  WHERE user_id = {user}
)
ORDER BY RANDOM ()
LIMIT 1;