// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// const Profile = () => {
//   const { state } = useLocation();
//   const username = state ? state.username : null;
//   // console.log(username)
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/profile/student', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ username: state.username }),
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch user profile');
//         }

//         const data = await response.json();
//         setUserData(data);
//       } catch (error) {
//         console.error('Error fetching user profile:', error.message);
//       }
//     };

//     if (state && state.username) {
//       fetchUserProfile();
//     }
//   }, [state]);



//   return (
//     <>
//     {userData ? (
//       <section style={{ backgroundColor: '#eee' }}>
//         <div className="container py-5">
       
//           <div className="row">
//             <div className="col-lg-4">
//               <div className="card mb-4">
//                 <div className="card-body text-center">
//                   <img src="https://i.postimg.cc/9QBKrpzH/Akash-Profile.jpg" alt="avatar"
//                     className="rounded-circle img-fluid" style={{ width: '150px' }} />
//                   <div className="my-3">{username ? <h2>Welcome, {userData.student_name}!</h2> : <p>No username available</p>}</div> 
//                   {/* <h5 className="my-3"></h5> */}
//                   <p className="text-muted mb-1">{userData.Student_standard}</p>
//                   <p className="text-muted mb-4">{userData.student_email}</p>
//                   <div className="d-flex justify-content-center mb-2">
//                     <button type="button" className="btn btn-primary">Follow</button>
//                     <button type="button" className="btn btn-outline-primary ms-1">Message</button>
//                   </div>
//                 </div>
//               </div>
//               <div className="card mb-4 mb-lg-0">
//                 <div className="card-body p-0">
//                   <ul className="list-group list-group-flush rounded-3">
//                     <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                       <i className="fas fa-globe fa-lg text-warning"></i>
//                       <p className="mb-0">https://mdbootstrap.com</p>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                       <i className="fab fa-github fa-lg" style={{ color: '#333333' }}></i>
//                       <p className="mb-0">mdbootstrap</p>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                       <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
//                       <p className="mb-0">@mdbootstrap</p>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                       <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
//                       <p className="mb-0">mdbootstrap</p>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                       <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
//                       <p className="mb-0">mdbootstrap</p>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-8">
//               <div className="card mb-4">
//                 <div className="card-body">
//                   <div className="row">
//                     <div className="col-sm-3">
//                       <p className="mb-0">Full Name</p>
//                     </div>
//                     <div className="col-sm-9">
//                     <p className="text-muted mb-0">{userData.student_name}</p>
//                     </div>
//                   </div>
//                   <hr />
//                   <div className="row">
//                     <div className="col-sm-3">
//                       <p className="mb-0">Email</p>
//                     </div>
//                     <div className="col-sm-9">
//                       <p className="text-muted mb-0">{userData.student_email}</p>
//                     </div>
//                   </div>
//                   <hr />
//                   <div className="row">
//                     <div className="col-sm-3">
//                       <p className="mb-0">Phone</p>
//                     </div>
//                     <div className="col-sm-9">
//                       <p className="text-muted mb-0">(097) 234-5678</p>
//                     </div>
//                   </div>
//                   <hr />
//                   <div className="row">
//                     <div className="col-sm-3">
//                       <p className="mb-0">Mobile</p>
//                     </div>
//                     <div className="col-sm-9">
//                       <p className="text-muted mb-0">{userData.student_mobile_no}</p>
//                     </div>
//                   </div>
//                   <hr />
//                   <div className="row">
//                     <div className="col-sm-3">
//                       <p className="mb-0">Address</p>
//                     </div>
//                     <div className="col-sm-9">
//                       <p className="text-muted mb-0">{userData.address_student_door_no},{userData.address_student_street},{userData.address_student_district},{userData.address_student_state}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-6">
//                   <div className="card mb-4 mb-md-0">
//                     <div className="card-body">
//                       <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
//                       </p>
//                       <p className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</p>
//                       <div className="progress rounded" style={{ height: '5px' }}>
//                         <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow="80"
//                           aria-valuemin="0" aria-valuemax="100"></div>
//                       </div>
//                       <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</p>
//                       <div className="progress rounded" style={{ height: '5px' }}>
//                         <div className="progress-bar" role="progressbar" style={{ width: '72%' }} aria-valuenow="72"
//                           aria-valuemin="0" aria-valuemax="100"></div>
//                       </div>
//                       <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</p>
//                       <div className="progress rounded" style={{ height: '5px' }}>
//                         <div className="progress-bar" role="progressbar" style={{ width: '89%' }} aria-valuenow="89"
//                           aria-valuemin="0" aria-valuemax="100"></div>
//                       </div>
//                       <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</p>
//                       <div className="progress rounded" style={{ height: '5px' }}>
//                         <div className="progress-bar" role="progressbar" style={{ width: '55%' }} aria-valuenow="55"
//                           aria-valuemin="0" aria-valuemax="100"></div>
//                       </div>
//                       <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</p>
//                       <div className="progress rounded mb-2" style={{ height: '5px' }}>
//                         <div className="progress-bar" role="progressbar" style={{ width: '66%' }} aria-valuenow="66"
//                           aria-valuemin="0" aria-valuemax="100"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="card mb-4 mb-md-0">
//                     <div className="card-body">
//                       <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
//                       </p>
//                       <p className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</p>
//                       <div className="progress rounded" style={{ height: '5px' }}>
//                         <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow="80"
//                           aria-valuemin="0" aria-valuemax="100"></div>
//                       </div>
//                       <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</p>
//                       <div className="progress rounded" style={{ height: '5px' }}>
//                         <div className="progress-bar" role="progressbar" style={{ width: '72%' }} aria-valuenow="72"
//                           aria-valuemin="0" aria-valuemax="100"></div>
//                       </div>
//                       <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</p>
//                       <div className="progress rounded" style={{ height: '5px' }}>
//                         <div className="progress-bar" role="progressbar" style={{ width: '89%' }} aria-valuenow="89"
//                           aria-valuemin="0" aria-valuemax="100"></div>
//                       </div>
//                       <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</p>
//                       <div className="progress rounded" style={{ height: '5px' }}>
//                         <div className="progress-bar" role="progressbar" style={{ width: '55%' }} aria-valuenow="55"
//                           aria-valuemin="0" aria-valuemax="100"></div>
//                       </div>
//                       <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</p>
//                       <div className="progress rounded mb-2" style={{ height: '5px' }}>
//                         <div className="progress-bar" role="progressbar" style={{ width: '66%' }} aria-valuenow="66"
//                           aria-valuemin="0" aria-valuemax="100"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const { state } = useLocation();
  const username = state ? state.username : null;
  // console.log(username)

  const [userData, setuserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/profile/student', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: state.username }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setuserData(data);
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    if (state && state.username) {
      fetchUserProfile();
    }
  }, [state]);

  return (
    <>
      <section style={{ backgroundColor: '#eee' }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img src="https://i.postimg.cc/9QBKrpzH/Akash-Profile.jpg"alt="avatar"
                    className="rounded-circle img-fluid" style={{ width: '150px' }} />
                  <div className="my-3">{username ? <h2>Welcome, {userData?.student_name}!</h2> : <p>No username available</p>}</div>
                  {/* <h5 className="my-3"></h5> */}
                  <p className="text-muted mb-1">{userData?.Student_standard}</p>
                  <p className="text-muted mb-4">{userData?.student_email}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <button type="button" className="btn btn-primary">Follow</button>
                    <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                  </div>
                </div>
              </div>
              <div className="card mb-4 mb-lg-0">
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fas fa-globe fa-lg text-warning"></i>
                      <p className="mb-0">https://mdbootstrap.com</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fab fa-github fa-lg" style={{ color: '#333333' }}></i>
                      <p className="mb-0">mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                      <p className="mb-0">@mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                      <p className="mb-0">mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                      <p className="mb-0">mdbootstrap</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData?.student_name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData?.student_email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">(097) 234-5678</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData?.student_mobile_no}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData?.address_student_door_no},{userData?.address_student_street},{userData?.address_student_district},{userData?.address_student_state}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                      </p>
                      <p className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</p>
                      <div className="progress rounded" style={{ height: '5px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow="80"
                          aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</p>
                      <div className="progress rounded" style={{ height: '5px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '72%' }} aria-valuenow="72"
                          aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</p>
                      <div className="progress rounded" style={{ height: '5px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '89%' }} aria-valuenow="89"
                          aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</p>
                      <div className="progress rounded" style={{ height: '5px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '55%' }} aria-valuenow="55"
                          aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</p>
                      <div className="progress rounded mb-2" style={{ height: '5px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '66%' }} aria-valuenow="66"
                          aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                      </p>
                      <p className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</p>
                      <div className="progress rounded" style={{ height: '5px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow="80"
                          aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</p>
                      <div className="progress rounded" style={{ height: '5px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '72%' }} aria-valuenow="72"
                          aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</p>
                      <div className="progress rounded" style={{ height: '5px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '89%' }} aria-valuenow="89"
                          aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</p>
                      <div className="progress rounded" style={{ height: '5px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '55%' }} aria-valuenow="55"
                          aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</p>
                      <div className="progress rounded mb-2" style={{ height: '5px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '66%' }} aria-valuenow="66"
                          aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
