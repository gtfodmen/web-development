PROGRAM WorkWithQueryString(INPUT, OUTPUT);
USES
  GPC;
FUNCTION GetQueryStringParameter(Key: STRING): STRING;
VAR 
  KeyCheck, QueryString : STRING;
BEGIN
  KeyCheck := '';
  QueryString := GetEnv('QUERY_STRING');
  KeyCheck := Copy(QueryString, pos(key, QueryString), length(key));
  IF Key = KeyCheck
  THEN                                                                           
    BEGIN
      Delete(QueryString, 1, pos(key, QueryString) + length(key));
      IF (pos('&', QueryString) > 1)                 
      THEN
        Delete(QueryString, pos('&', QueryString), length(QueryString));
      GetQueryStringParameter := QueryString;
    END
  ELSE
    GetQueryStringParameter := 'No Request'
END;    
BEGIN {WorkWithQueryString}
  WRITELN;
  WRITELN('First Name: ', GetQueryStringParameter('first_name'));
  WRITELN('Last Name: ', GetQueryStringParameter('last_name'));
  WRITELN('Age: ', GetQueryStringParameter('age'))
END. {WorkWithQueryString}

