import React from 'react';

export default function ConfMat(props) {

  const tp = props?.data?.[1]?.[1];
  const fn = props?.data?.[0]?.[1];
  const fp = props?.data?.[1]?.[0];
  const tn = props?.data?.[0]?.[0];

  return (
    <table class="divide-y divide-gray-200">
      <thead class="bg-white">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Paid Off
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Defaulted
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            Predicted to Pay Off
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
            {tp}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {fn}
          </td>
        </tr>
        <tr class="bg-white">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            Predicted Default
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
            {fp}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {tn}
          </td>
        </tr>
      </tbody>
    </table>
  )
}