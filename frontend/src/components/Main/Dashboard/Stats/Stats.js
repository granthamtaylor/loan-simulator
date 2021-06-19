import React from 'react';
import { dollarFormatter, commaFormatter, percentFormatter } from '../../../../helper/formatting'

export default function Stats(props) {

  return (

    <div >
      <div class="grid grid-cols-2 gap-4 md:grid-cols-6 text-center">
        <div class="bg-white shadow rounded-lg col-span-6 md:col-span-6 lg:col-span-2 w-full">
          <div class="px-4 py-5 md:p-6 w-full">
            <div class="text-sm font-medium text-gray-500">
              Portfolio Value
            </div>
            <div class="p-1 text-3xl font-semibold text-gray-900 w-full">
              { dollarFormatter(props.data?.value_sum) }
            </div>
          </div>
        </div>
        <div class="bg-white shadow rounded-lg col-span-6 md:col-span-3 lg:col-span-2 w-full">
          <div class="px-4 py-5 md:p-6 w-full">
            <div class="text-sm font-medium text-gray-500">
              Loans Reviewed
            </div>
            <div class="p-1 text-3xl font-semibold text-gray-900 w-full">
              { commaFormatter(props.data?.n_reviewed) }
            </div>
          </div>
        </div>
        <div class="bg-white shadow rounded-lg col-span-6 md:col-span-3 lg:col-span-2 w-full">
          <div class="px-4 py-5 md:p-6 w-full">
            <div class="text-sm font-medium text-gray-500">
              Loan Approval Rate
            </div>
            <div class="p-1 text-3xl font-semibold text-gray-900 w-full">
              { percentFormatter(props.data?.n_approved/props.data?.n_reviewed) }%
            </div>
          </div>
        </div>
      </div>
    </div>
      
  )

}