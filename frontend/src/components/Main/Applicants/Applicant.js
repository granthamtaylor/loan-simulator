import React from "react";
import Section from './Form/Section'
import Spacer from './Form/Spacer'
import Input from './Form/Input'
import DollarInput from './Form/DollarInput'
import PercentInput from './Form/PercentInput'

import API from '../../../helper/django.service';

import { commaFormatter, titleCase, percentFormatter, policyCoder } from '../../../helper/formatting';

const faker = require('faker');

export default function Applicant(props) {

  const handleReview = (decision) => {

    const review = {
      applicant: props.applicant.id,
      decision,
      date: new Date()
    }

    API.postReview(review)
      .then( () => {
        
        API.getApplication()
        .then((response) => { 
          props.setApplicant(response?.data[0]);
        });
        
      })
      
    }


  return (

    <>

      <div className="flex flex-col h-screen w-full p-6 space-y-4">
        <div className="flex-grow overflow-y-scroll h-full w-full py-6 bg-white shadow rounded-lg">
          <div class="bg-white w-full mt-14">
            <div class="flex justify-center -mt-8">
              <img src={`https://ui-avatars.com/api/?name=${props.applicant.first_name}+${props.applicant.last_name}`} alt="Applicant Avatar" class="rounded-full border-solid border-white border-2 -mt-10"/>		
            </div>
            <div class="text-center px-3 pb-2 pt-2">
              <h3 class="text-black text-2xl bold font-sans">
                {`${props.applicant.first_name} ${props.applicant.last_name}`}
              </h3>
              <p class="mt-2 font-sans font-light text-grey-dark">
              {`${props.applicant.street_address}`}
              <br></br>
              {`${faker.address.city()}, ${props.applicant.addr_state}`}              
              </p>

            </div>
          </div>

          <Spacer/>
          <Section
            title="Requested Loan Details"
            subtitle="Proposed Terms of the Loan"
          >

              <DollarInput
                key="loan_amnt"
                label="Requested Loan Amount"
                value={ commaFormatter(props.applicant.loan_amnt) }
                type="text"
                size="md"
              />
              <PercentInput
                key="int_rate"
                label="Interest Rate"
                value={ percentFormatter(props.applicant.int_rate) }
                type="text"
                size="md"
              />
              <DollarInput
                key="installment"
                label="Monthly Loan Installment"
                value={ commaFormatter(props.applicant.installment) }
                type="text"
                size="md"
              />
              <Input
                key="title"
                label="Loan Purpose"
                value={ titleCase(props.applicant.title)}
                type="text"
                size="md"
              />
              <Input
                key="term"
                label="Loan Term"
                value={ `${props.applicant.term} Months` }
                type="text"
                size="md"
              />
              <Input
                key="application_type"
                label="Application Type"
                value={props.applicant.application_type}
                type="text"
                size="md"
              />

          </Section>

          <Spacer/>

          <Section
            title="Employment History"
            subtitle="Basic employment information"
          >

              <Input
                key="emp_length"
                label="Employment Length"
                value={ titleCase(props.applicant.emp_length) }
                type="text"
                size="md"
              />
              <Input
                key="emp_title"
                label="Employment Title"
                value={props.applicant.emp_title}
                type="text"
                size="md"
              />
              <DollarInput
                key="annual_inc"
                label="Annual Income"
                value={ commaFormatter(props.applicant?.annual_inc) }
                type="text"
                size="md"
              />
              <Input
                key="dti"
                label="Debt to (Monthly) Income Ratio"
                value={props.applicant.dti}
                type="text"
                size="md"
              />

          </Section>

          <Spacer/>


          <Section
            title="Background Check"
            subtitle="Additional financial quality assurance information"
          >
              <Input
                key="grade"
                label="Loan Grade"
                value={props.applicant.grade}
                type="text"
                size="md"
              />
              
              <Input
                key="home_ownership"
                label="Homeownership Status"
                value={ titleCase(props.applicant.home_ownership) }
                type="text"
                size="md"
              />
              
              <Input
                key="mort_acc"
                label="Number of Mortgage Accounts on Record"
                value={props.applicant.mort_acc}
                type="text"
                size="md"
              />

              <Input
                key="mo_sin_old_il_acct"
                label="Age of Oldest Installment Account"
                value={ `${props.applicant.mo_sin_old_il_acct} Months` }
                type="text"
                size="md"
              />
              <Input
                key="mo_sin_old_rev_tl_op"
                label="Age of Oldest Revolving Account"
                value={ `${props.applicant.mo_sin_old_rev_tl_op} Months` }
                type="text"
                size="md"
              />
              <Input
                key="accounts"
                label="Number of Accounts"
                value={`${props.applicant.open_acc} open / ${props.applicant.total_acc} total`}
                type="text"
                size="md"
              />
              <Input
                key="verification_status"
                label="Verification Status"
                value={props.applicant.verification_status}
                type="text"
                size="md"
              />
              <Input
                key="policy_code"
                label="Policy Code"
                value={policyCoder(props.applicant.policy_code)}
                type="text"
                size="md"
              />

          </Section>

        </div>

        <div className="flex-grow-0">
          <div className="bottom-0 flex space-x-4">
            <div className="text-center w-full">
              <button className="bg-red-500 transition w-full shadow hover:bg-red-600 text-white font-bold py-2 rounded-lg" onClick={ () => { handleReview(false) }}>
                Reject
              </button>
            </div>
            <div className="text-center w-full">
              <button className="bg-green-500 transition w-full shadow hover:bg-green-600 text-white font-bold py-2 rounded-lg" onClick={ () => { handleReview(true) }}>
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}