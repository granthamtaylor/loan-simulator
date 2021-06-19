import os

from django.conf import settings
from django.db import connection

def read_sql(file, **formatters):

  static = settings.STATICFILES_DIRS[0]
  
  path = os.path.join(
    static,
    'sql',
    f'{file}.sql'
  )

  with open(path, 'r') as sql:
    query = sql.read()

  if len(formatters) > 0:
    query = query.format(**formatters)

  return query

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

class QueryBase:

  def __init__(self):

    staticdir = settings.STATICFILES_DIRS[0]

    sqldir = os.path.join(staticdir, 'sql')

    self.queries = {}

    for filename in os.listdir(sqldir):
      if filename.endswith('.sql'):

        filepath = os.path.join(sqldir, filename)

        with open(filepath, 'r') as sql:
          query = sql.read()

        queryname = filename.rsplit('.', 1)[0]

        self.queries[queryname] = query

  def __getitem__(self, key):
    return self.queries[key]

  def execute(self, queryname, **formatters):

    query = self.queries[queryname]

    if len(formatters) > 0:
      query = query.format(**formatters)

    with connection.cursor() as cursor:
      cursor.execute(query)
      return dictfetchall(cursor)