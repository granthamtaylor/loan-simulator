import React from 'react';
import * as FontAwesome from "react-icons/fa";
import { dollarFormatter, commaFormatter, percentFormatter } from '../../../helper/formatting'

export default function Modal(props) {

  return (
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div>
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              {React.createElement(FontAwesome["FaUserAlt"], { className: "text-green-600 h-6 w-6 "})}
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                {`${props.user?.first_name} ${props.user?.last_name}`}
              </h3>
              <div class="mt-2">

                <div class="p-3 w-full">
                  <div class="text-sm font-medium text-gray-500">
                    Portfolio Value
                  </div>
                  <div class="p-1 text-3xl font-semibold text-gray-900 w-full">
                    { dollarFormatter(props.user?.value_sum) }
                  </div>
                </div>

                <div class="p-3 w-full">
                  <div class="text-sm font-medium text-gray-500">
                    Loans Reviewed
                  </div>
                  <div class="p-1 text-3xl font-semibold text-gray-900 w-full">
                    { commaFormatter(props.user?.n_reviewed) }
                  </div>
                </div>

                <div class="p-3 w-full">
                  <div class="text-sm font-medium text-gray-500">
                    Loan Approval Rate
                  </div>
                  <div class="p-1 text-3xl font-semibold text-gray-900 w-full">
                    { percentFormatter(props.user?.n_approved/props.user?.n_reviewed) }%
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <button type="button" onClick={props.close} class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}