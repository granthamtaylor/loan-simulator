import React, { useState } from "react";
import Modal from './Modal'

import { commaFormatter, dollarFormatter } from '../../../helper/formatting';
import API from '../../../helper/django.service';


export default function TableRanking(props) {

  const [ detailedUser, setDetailedUser ] = useState();

  function handleDetailUser(username) {

    API.getUser(username)
    .then((response) => { 
      setDetailedUser(response?.data[0]);
    });

  }

  return (
    <div className="flex flex-col p-6 w-full">
      <div className="align-middle inline-block min-w-full">
        <div className="shadow bg-white overflow-hidden border-b border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 text-center">
            <thead>
              <tr className="text-center">
                <th scope="col" className="px-4 py-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lender
                </th>
                <th scope="col" className="px-4 py-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Number of Loans
                </th>
                <th scope="col" className="px-4 py-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Loan Value
                </th>
                <th scope="col" className="px-4 py-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Portfolio Value
                </th>
              </tr>
            </thead>

            { props.leaderboard
              
              ? <tbody className="divide-y divide-gray-200">

                  { props.leaderboard.map( (user) => {
                    return (
                      <tr onClick={ () => handleDetailUser(user?.id) } className="hover:bg-gray-50 cursor-pointer">
                        <td className="px-4 py-6 whitespace-nowrap text-sm text-gray-500">
                          { user?.username }
                        </td>
                        <td className="px-4 py-6 whitespace-nowrap text-sm text-gray-500">
                          { commaFormatter(user?.n_reviews) }
                        </td>
                        <td className="px-4 py-6 whitespace-nowrap text-sm text-gray-500">
                          { dollarFormatter(user?.avg_value) }
                        </td>
                        <td className="px-4 py-6 whitespace-nowrap text-sm text-gray-500">
                          { dollarFormatter(user?.portfolio_value) }
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
      { detailedUser
        ? <Modal user={detailedUser} close={ () => setDetailedUser(null) }/>
        : null
      }
    </div>

  )

}