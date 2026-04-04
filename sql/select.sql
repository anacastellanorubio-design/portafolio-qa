--consultar todos los datos de la tabla form
SELECT * FROM form;
--filtrar por nombre Ana,
SELECT * FROM form WHERE nombre= 'Ana';
--filtrar por nombre sin nombre
SELECT * FROM form WHERE nombre IS NULL;
--filtrar por nombre que empiece por A,
SELECT * FROM form WHERE nombre LIKE 'A%';
--filtrar por edad entre 20 y 30 
SELECT * FROM form WHERE edad between 20 and 30;
--filtrar por asunto job y information
SELECT * FROM form WHERE asunto IN ('job','information');
--filtrar por nombre Maria o Ana 
SELECT * FROM form WHERE nombre IN ('Maria','Ana');
--filtrar por email que contenga gmail y asunto job
SELECT * FROM form WHERE email LIKE '%gmail%' AND asunto='job';
--filtrar por edad mayor a 30 y mensaje que contenga test
SELECT * FROM form WHERE edad >30 AND mensaje LIKE  '%test%';
--Mostrar los datos ordenados por email de la A a la Z
SELECT * FROM form ORDER BY email ASC;
