PROGRAM HelloDear(INPUT, OUTPUT);
USES
  GPC;
VAR
  NameState: STRING;
BEGIN {HelloDear}
  WRITELN;
  WRITELN(‘Content-Type: text/plain’);
  NameState := GetEnv('QUERY_STRING');
  DELETE(NameState, 1, 5);
  IF NameState = ''
  THEN
    WRITELN('Hello, Anonymous!')
  ELSE
    WRITELN('Hello, ', NameState, '!')  
END. {HelloDear}
