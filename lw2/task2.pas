PROGRAM SarahRevere(INPUT, OUTPUT);
USES
  GPC;
VAR
  StateString: STRING;
BEGIN {SarahRevere}
  WRITELN;
  WRITELN(‘Content-Type: text/plain’);
  StateString := GetEnv('QUERY_STRING'); 
  IF StateString = 'lanterns=1'
  THEN
    WRITELN('The British are coming by land.')
  ELSE
    IF StateString = 'lanterns=2'
    THEN
      WRITELN('The British are coming by sea.')
    ELSE
      WRITELN('Sarah didn’’t say')
END. {SarahRevere}
