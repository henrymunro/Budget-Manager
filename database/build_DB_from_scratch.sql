use Budget;

SELECT 'BUILDING TABLES, VIEWS AND FUNCTIONS';
source Budget-Manager_create_DB_0.1.sql;


SELECT 'BUILDING ACCOUNTS PROCS';
source accountProcs.sql;
SELECT 'BUILDING FILE UPLOAD PROCS';
source fileUploadProcs.sql;
SELECT 'BUILDING LEDGER PROCS';
source ledgerProcs.sql;
SELECT 'BUILDING MAPPING PROCS';
source mappingProcs.sql;
SELECT 'BUILDING TYPE PROCS';
source typeProcs.sql;
SELECT 'BUILDING GRAPH PROCS';
source graphProcs.sql;
SELECT 'BUILDING LOGGING PROCS';
source loggingProcs.sql

SELECT 'DONE!';
