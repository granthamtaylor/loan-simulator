import json

import pandas as pd
import numpy as np
from faker import Faker
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn import metrics

faker = Faker()

class ReviewPipeline:

  def __init__(self, elements, model, target = 'loan_status'):

    self.target = target

    self.elements = elements

    self.features = {
     'numeric': [element['name'] for element in elements if (element['type'] == 'numeric') & element['feature'] ],
     'categorical': [element['name'] for element in elements if (element['type'] == 'categorical') & element['feature'] ]
    }

    self.pipe = Pipeline(
      steps=[
        ('preprocessor',
        ColumnTransformer(
          transformers=[
            ('num',
            Pipeline(steps=[
              ('imputer', SimpleImputer(strategy='median')),
              ('scaler', StandardScaler())]),
            self.features['numeric']),

            ('cat',
            Pipeline(steps=[
              ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
              ('onehot', OneHotEncoder(handle_unknown='ignore'))]),
            self.features['categorical'])]
          )
        ),
        ('classifier', model)
      ]
    )

  def preprocess(self, df):

    df['earliest_cr_line'] = pd.to_datetime(df['earliest_cr_line'] ,format='%m%Y', errors='coerce').dt.to_period('m')
    df['issue_d'] = pd.to_datetime(df['issue_d'] ,format='%m%Y', errors='coerce').dt.to_period('m')
    # df['num_months_history'] = df['earliest_cr_line'] - df['issue_d']
    df = df.drop(['earliest_cr_line', 'issue_d'], axis=1)
    df['policy_code'] = df['policy_code'] == 1
    return df

  def inline_df_split(self, df):

    y = df[self.target]
    X = df.drop(self.target, axis=1)
    return X, y

  def fit(self, df):
    
    df = self.preprocess(df)
    X, y = self.inline_df_split(df)
    self.pipe.fit(X, y)

  def predict(self, df):
    df = self.preprocess(df)
    X, _ = self.inline_df_split(df)
    return self.pipe.predict_proba(X)

  def score(self, df):
    
    df = self.preprocess(df)
    X, y = self.inline_df_split(df)
    
    metrics.plot_roc_curve(self.pipe, X, y)

  def create_fixture(self, df, modelname='Applicant', appname='main'):

    '''
    This is just a handy method to convert dataframes to Django Fixtures
    '''

    fixture = []

    df['int_rate'] = df['int_rate']/100
    df['term'] = df['term'].apply(lambda col: col[:3]).astype(int)

    def calc_npv(row):

      dr = 0.01/12

      status = row['loan_status']
      principal = row['loan_amnt']
      pmt = row['installment']

      if status == "Fully Paid":
        nper = row['term']
      
      else:
        nper = round(row['total_pymnt']/pmt)

      return np.pv(dr, nper, -pmt) - principal

    def append_faker(df, function):
      return [function() for _ in range(len(df))]

    df['npv'] = df.apply(calc_npv, axis=1)

    columns = [element['name'] for element in self.elements]

    df = df[columns] \
     .replace({np.nan: None})


    df['first_name'] = append_faker(df, faker.first_name)
    df['last_name'] = append_faker(df, faker.last_name)
    df['street_address'] = append_faker(df, faker.street_address)

    for index, row in df.iterrows():
      fixture.append({
        'model': f'{appname}.{modelname}',
        'pk': index,
        'fields': row.to_dict()
      })

    return json.dumps(fixture, indent=2)
