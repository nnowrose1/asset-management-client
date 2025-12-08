import React from 'react';

const MyEmployees = () => {
    
    return (
       <div className="px-6">
             <h2 className="text-3xl font-semibold text-secondary text-center py-6">
               My Employees: 
             </h2>
       
             <div className="overflow-x-auto">
               <table className="table">
                 {/* head */}
                 <thead>
                   <tr>
                     <th>Serial No.</th>
                     <th>Asset Image</th>
                     <th>Name</th>
                     <th>Type</th>
                     <th>Quantity</th>
                     <th>Date Added</th>
                     <th>Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {assets.map((asset, index) => (
                     <tr key={asset._id}>
                       <th>{index + 1}</th>
                       <td>
                         <div className="flex items-center gap-3">
                           <div className="avatar">
                             <div className="mask mask-squircle h-12 w-12">
                               <img src={asset.productImage} alt="Asset Image" />
                             </div>
                           </div>
                         </div>
                       </td>
                       <td className="font-semibold">{asset.productName}</td>
                       <td>{asset.productType}</td>
                       <td className="font-semibold">{asset.availableQuantity}</td>
                       <td>{new Date(asset.dateAdded).toLocaleString()}</td>
                       <th>
                         <button className="btn btn-primary hover:bg-blue-800 text-white btn-xs">
                           <MdModeEdit />
                         </button>
                         <button className="btn btn-primary hover:bg-blue-800 text-white btn-xs ms-2">
                          <MdDelete />
                         </button>
                         
                       </th>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
    );
};

export default MyEmployees;