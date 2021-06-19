import re

from django.db import models
from django.contrib.auth.models import User
from django_pgviews import view as pg

from .utilities import QueryBase

querybase = QueryBase()

class Applicant(models.Model):

    id = models.AutoField(primary_key=True, verbose_name="Application ID", unique=True)

    street_address = models.CharField(max_length=128, verbose_name="street_address", null=True)
    first_name = models.CharField(max_length=128, verbose_name='First Name', null=False)
    last_name = models.CharField(max_length=128, verbose_name='Last Name', null=False)
    
    logit = models.DecimalField(max_digits=7, decimal_places=6, verbose_name='Logistic Regression Prediction', null=True)
    xgb = models.DecimalField(max_digits=7, decimal_places=6, verbose_name='Extreme Gradient Boosting Prediction', null=True)

    addr_state = models.CharField(max_length=2, verbose_name='Applicant State', null=True)
    annual_inc = models.DecimalField(max_digits=15, decimal_places=2, verbose_name='Applicant Annual Income', null=True)
    application_type = models.CharField(max_length=128, verbose_name='Application Type', null=True)
    desc = models.TextField(max_length=1028, verbose_name='Loan Description', null=True)
    dti = models.DecimalField(max_digits=8, decimal_places=4, verbose_name='Debt to Income Ratio', null=True)
    earliest_cr_line = models.CharField(max_length=128, verbose_name='Earliest Credit Line', null=True)
    emp_length = models.CharField(max_length=128, verbose_name='Applicant Employment Length', null=True)
    emp_title = models.CharField(max_length=256, verbose_name='Applicant Employer Name', null=True)
    fico_range_high = models.IntegerField(verbose_name='Credit History (High)', null=True)
    fico_range_low = models.IntegerField(verbose_name='Credit History (Low)', null=True)
    grade = models.CharField(max_length=1, verbose_name='Loan Grade', null=True)
    home_ownership = models.CharField(max_length=16, verbose_name='Applicant Home Ownership', null=True)
    initial_list_status = models.CharField(max_length=16, verbose_name='Applicant Initial List Status', null=True)
    installment =  models.DecimalField(max_digits=16, decimal_places=2, verbose_name='Monthly Installment', null=True)
    int_rate =  models.DecimalField(max_digits=6, decimal_places=4, verbose_name='Interest Rate', null=True)
    issue_d = models.CharField(max_length=128, verbose_name='Loan Issue Date', null=True)
    loan_amnt = models.DecimalField(max_digits=16, decimal_places=2, verbose_name='Loan Amount', null=True)
    loan_status = models.BooleanField(verbose_name='Loan Status', null=False)
    mo_sin_old_il_acct = models.DecimalField(max_digits=16, decimal_places=2, verbose_name="Age of oldest Installment Account", null=True)
    mo_sin_old_rev_tl_op = models.DecimalField(max_digits=16, decimal_places=2, verbose_name="Age of oldest Revolving Account", null=True)
    mort_acc = models.IntegerField(verbose_name="Number of Mortgage Accounts", null=True)
    npv = models.DecimalField(max_digits=16, decimal_places=4, verbose_name="Net Present Value", null=True)
    open_acc = models.IntegerField(verbose_name="Number of Open Accounts", null=True)
    policy_code = models.IntegerField(verbose_name="Loan Policy Code", null=True)
    pub_rec = models.IntegerField(verbose_name="Number of Derogatory Public Records", null=True)
    pub_rec_bankruptcies = models.IntegerField(verbose_name="Number of Public Record Bankruptcies", null=True)
    purpose = models.CharField(max_length=128, verbose_name="Loan Purpose", null=True)
    revol_bal = models.DecimalField(max_digits=16, decimal_places=2, verbose_name="Revolving Balance", null=True)
    revol_util = models.DecimalField(max_digits=16, decimal_places=2, verbose_name="Revolving Utility", null=True)
    term = models.IntegerField(verbose_name="Loan Term", null=True)
    title = models.CharField(max_length=128, verbose_name="Loan Title", null=True)
    total_acc = models.IntegerField(verbose_name="Number of Total Accounts", null=True)
    verification_status = models.CharField(max_length=128, verbose_name="Applicant Verification Status", null=True)
    zip_code = models.CharField(max_length=12, verbose_name="Applicant Zip Code", null=True)

    class Meta:
        db_table = 'applicant'

class Review(models.Model):

    id = models.AutoField(primary_key=True, verbose_name="Review ID", unique=True)
    applicant = models.ForeignKey(Applicant, on_delete = models.CASCADE, verbose_name='Application ID', null=False)
    user = models.ForeignKey(User, on_delete = models.CASCADE, verbose_name='User ID', null=False)
    decision = models.BooleanField(verbose_name='Decision', choices=((True, 'Accepted'), (False, 'Rejected')), null=False)
    date = models.DateTimeField(verbose_name='Review Date', null=False)

    class Meta:
        db_table = 'review'
        constraints = [
            models.UniqueConstraint(
                name='Unique User-Applicant Review',
                fields=['applicant_id', 'user_id']
            )
        ]

class Ranking(pg.View):

    sql = querybase['table-ranking']

    class Meta:
      app_label = 'main'
      db_table = 'ranking'
      managed = False