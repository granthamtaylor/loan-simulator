import React, {useState, useEffect} from 'react';
import API from '../../../helper/django.service';
import {dollarFormatter, percentFormatter} from '../../../helper/formatting';

export default function History(props) {

  const [reviewHistory, setReviewHistory] = useState();

  useEffect (() => {

    API.getReviewHistory()
      .then((response) => { 
        setReviewHistory(response?.data);
      });

  }, []);


  return (
    <div className="flex flex-col p-6 w-full h-screen">
      <div className="align-middle inline-block min-w-full flex-grow overflow-auto bg-white shadow rounded-lg">
          <table className="min-w-full relative table-auto text-center">
            <thead>
              <tr className="shadow-lg">
                <th scope="col" className="rounded-tl-lg bg-white relative sticky top-0 px-4 py-6 bg-transparent text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                </th>
                <th scope="col" className="bg-white relative sticky top-0 px-4 py-6 bg-transparent text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Review Decision
                </th>
                <th scope="col" className="bg-white relative sticky top-0 px-4 py-6 bg-transparent text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan Status
                </th>
                <th scope="col" className="rounded-tr-lg bg-white relative sticky top-0 px-4 py-6 bg-transparent text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Present Value
                </th>
              </tr>
            </thead>

            { reviewHistory
              
              ? <tbody className="divide-y divide-gray-100">

                  { reviewHistory.map( (review) => {
                    return (
                      <tr>
                        <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                          { review?.applicant }
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                          { review?.decision
                            ? <span className="bg-green-100 py-1 px-3 rounded-full">
                                Accepted
                              </span>
                            : <span className="bg-red-100 py-1 px-3 rounded-full">
                                Rejected
                              </span>
                          }
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                          { review?.decision
                            ? review?.outcome
                              ? <span className="bg-green-100 py-1 px-3 rounded-full">
                                  Paid Off
                                </span>
                              : <span className="bg-red-100 py-1 px-3 rounded-full">
                                  Defaulted
                                </span>
                            : <>
                              </>
                          }
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                          { review?.decision
                            ? <span>
                                { dollarFormatter(review?.npv)}
                              </span>
                            : <>
                              </>
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              : null
            }
          </table>
        </div>
    </div>
  )

}