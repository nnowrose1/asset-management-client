// import React, { useState } from 'react';
// import useAxiosSecure from '../../../customHooks/useAxiosSecure';
// import useAuth from '../../../customHooks/useAuth';

// const MyAssets = () => {
//     const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [searchText, setSearchText] = useState("");
//     return (
//        <div className="px-6">
//             <h2 className="text-3xl font-semibold text-secondary text-center py-6">
//               Asset List
//             </h2>
//             {/* search box */}
//             <div className="join mb-6">
//               <label className="input validator join-item">
//                 <input
//                   value={searchText}
//                   onChange={(e) => setSearchText(e.target.value)}
//                   type="text"
//                   placeholder="search asset"
//                   required
//                 />
//               </label>
      
//               <button className="btn btn-primary text-white join-item">Search</button>
//             </div>
      
//             <div className="overflow-x-auto">
//               {
//                 filteredAssets.length === 0 ? 
//                 <h2 className="text-2xl text-secondary font-semibold text-center py-6">No assets found!</h2>
//                 :
              
//               <table className="table">
//                 {/* head */}
//                 <thead>
//                   <tr>
//                     <th>Serial No.</th>
//                     <th>Asset Image</th>
//                     <th>Name</th>
//                     <th>Type</th>
//                     <th>Company Name</th>
//                     <th>Request Date</th>
//                     <th>Approval Date</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredAssets.map((asset, index) => (
//                     <tr key={asset._id}>
//                       <th>{index + 1}</th>
//                       <td>
//                         <div className="flex items-center gap-3">
//                           <div className="avatar">
//                             <div className="mask mask-squircle h-12 w-12">
//                               <img src={asset.productImage} alt="Asset Image" />
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="font-semibold">{asset.productName}</td>
//                       <td>{asset.productType}</td>
//                       <td className="font-semibold">{asset.availableQuantity}</td>
//                       <td>{new Date(asset.dateAdded).toLocaleString()}</td>
//                       <th>
//                         <button className="btn btn-primary hover:bg-blue-800 text-white btn-xs">
                          
//                         </button>
//                         <button className="btn btn-primary hover:bg-blue-800 text-white btn-xs ms-2">
                          
//                         </button>
//                       </th>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//       }
//             </div>
                
//           </div>
//     );
// };

// export default MyAssets;
import React from 'react';

const MyAssets = () => {
    return (
        <div>
            
        </div>
    );
};

export default MyAssets;