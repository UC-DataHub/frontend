// "use client";
// import Loader from '@/components/Loader';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';

// const redirect = () => {
//     const { data: session, status } = useSession();
//     const [role, setRole] = useState("")
//     const [userData, setUserData] = useState();
//     const [user, setUser] = useState();
//     const [profileImage, setProfileImage] = useState("");
//     const router = useRouter();
//     if (userData?.role === "client") {
//         router.push("/cl");
//     }
//     else if (userData?.role === "freelancer") {
//         router.push("/fl");
//     }
//     useEffect(() => {
//         // const data = JSON.parse(sessionStorage.getItem('datahub'));
//         // setUserData(data);
//         if (!userData) {
//             if (session?.user?.email) {
//                 // setUserEmail(session.user.email);
//                 async function fetchUserData(email) {
//                     try {
//                         const response = await fetch('/api/userInfoByEmail', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json'
//                             },
//                             body: JSON.stringify({ data: { email } })
//                         });
//                         const result = await response.json();

//                         if (response.ok) {
//                             console.log("User Data:", result.user);
//                             setUser(result.user);

//                             const sessionData = {
//                                 email: user.email,
//                                 name: user.fullname,
//                                 id: user._id,
//                                 role: user.role,
//                                 profileImage: user.imageLink,
//                                 phone: user.phone

//                             };
//                             setProfileImage(user?.imageLink || "")
//                             setRole(sessionData?.role);
//                             console.log("sdsd", role);
//                             sessionStorage.setItem('datahub', JSON.stringify(sessionData));
//                             console.log('Session data stored in sessionStorage:', sessionData);
//                             const data = JSON.parse(sessionStorage.getItem('datahub'));
//                             setRole(data?.role);
//                             setUserData(data);
//                         } else {
//                             console.error("Error:", result.message);
//                         }
//                     } catch (error) {
//                         console.error("Fetch Error:", error);

//                     }
//                 }

//                 fetchUserData(session.user.email);

//             }
//             else {
//                 const data = JSON.parse(sessionStorage.getItem('datahub'));
//                 setUserData(data);
//                 console.log("asas", data);
//                 // setUserEmail(data?.email);
//                 setRole(data?.role);
//             }
//         }
//     }, [session, role, user, userData]);

//     useEffect(() => {
//         const userData = JSON.parse(sessionStorage.getItem('datahub'));
//         setUserData(userData);
//         if (userData?.role === "client") {
//             router.push("/cl");
//         }
//         else if (userData?.role === "freelancer") {
//             router.push("/fl");
//         }
//         // else {
//         //     router.push("/");
//         // }
//     }, [user, userData])

//     return (
//         <div className="h-screen w-screen"><Loader /></div>
//     )
// }

// export default redirect;
