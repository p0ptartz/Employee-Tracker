SELECT t1.id, t1.first_name, t1.last_name, role.title, department.name AS department, role.salary, CONCAT(t2.first_name, ' ', t2.last_name) AS manager
FROM employee t1
JOIN role
ON t1.role_id = role.id
JOIN department
ON role.department_id = department.id
LEFT JOIN employee t2
ON  t2.id= t1.manager_id