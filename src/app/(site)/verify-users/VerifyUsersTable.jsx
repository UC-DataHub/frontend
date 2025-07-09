'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, EyeOff, Check, X } from 'lucide-react';
import LoadingOverlay from '@/components/Datasets/LoadingOverlay';

export default function VerifyUsersTable() {
  const [users, setUsers] = useState([]);
  const [fadingOut, setFadingOut] = useState({}); // userId -> seconds left
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get('/api/auth/users/');
        setUsers(res.data);
      } catch (err) {
        setUsers([]);
        toast.error('Failed to load users');
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    // Set loading to false after users are fetched, or if no users are present
    if (users.length > 0) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [users]);

  // Handle fade countdowns
  useEffect(() => {
    const interval = setInterval(() => {
      setFadingOut(prev => {
        const updated = { ...prev };
        for (const id in updated) {
          updated[id] -= 1;
          if (updated[id] <= 0) {
            // Remove user from list when time is up
            setUsers(u => u.filter(user => user.id !== parseInt(id)));
            delete updated[id];
          }
        }
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleVerify = async (userId, currentStatus) => {
    try {
      await axiosInstance.patch(`/api/users/${userId}/`, {
        is_verified: !currentStatus,
      });
      setUsers(users.map(u =>
        u.id === userId ? { ...u, is_verified: !currentStatus } : u
      ));
      if (!currentStatus) {
        // If user is now verified, start fade-out timer
        setFadingOut({ ...fadingOut, [userId]: 5 }); // seconds
      }
      toast.success('Status updated');
    } catch {
      toast.error('Error updating');
    }
  };

  const undoVerify = (userId) => {
    // Stop fade out
    const updated = { ...fadingOut };
    delete updated[userId];
    setFadingOut(updated);
  };

  const hideUser = async (userId) => {
    try {
      await axiosInstance.patch(`/api/users/${userId}/`, {
        hidden_from_verifier: true,
      });
      setUsers(users.filter(u => u.id !== userId));
      toast.success('User hidden');
    } catch {
      toast.error('Error hiding user');
    }
  };

  if (users.length === 0) {
    return (
      <div className="mt-8 p-6 text-center border border-gray-600 rounded flex flex-row items-center gap-2">
        {loading && <LoadingOverlay message="Fetching users..." />}
        <CheckCircle className="text-green-500 inline" size={20} />
        <p className="text-lg">
          All done! No users left to verify.</p>
      </div>
    );
  }

  return (
    <>
      {
        loading ? <LoadingOverlay message="Fetching users..." />
          : users.length === 0 ? (
            <div className="mt-8 p-6 text-center border border-gray-600 rounded flex flex-row items-center gap-2">
              {loading && <LoadingOverlay message="Fetching users..." />}
              <CheckCircle className="text-green-500 inline" size={20} />
              <p className="text-lg">
                All done! No users left to verify.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded border border-gray-600">
              <table className="w-full text-left table-fixed">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-3 w-1/3">Email</th>
                    <th className="px-4 py-3 w-1/4">Name</th>
                    <th className="px-4 py-3 w-1/6">Verified?</th>
                    <th className="px-4 py-3 w-1/3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {users.map(user => (
                    <tr
                      key={user.id}
                      className={`transition-opacity duration-500 ${
                        fadingOut[user.id] ? 'opacity-50' : ''
                      }`}
                    >
                      <td className="px-4 py-2 break-all">{user.email}</td>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">
                        {user.is_verified ? (
                          <CheckCircle className="text-green-500 inline" size={20} />
                        ) : (
                          <XCircle className="text-red-500 inline" size={20} />
                        )}
                      </td>
                      <td className="px-4 py-2 space-x-2 flex items-center">
                        <button
                          onClick={() => toggleVerify(user.id, user.is_verified)}
                          className="relative inline-flex items-center overflow-hidden px-3 py-1 rounded border border-green-600 bg-green-600 text-white hover:bg-green-700 transition"
                        >
                          {/* Progress fill */}
                          {fadingOut[user.id] && (
                            <div
                              className="absolute left-0 top-0 h-full bg-green-800 opacity-50 transition-all"
                              style={{
                                width: `${100 - (fadingOut[user.id] / 5) * 100}%`,
                              }}
                            ></div>
                          )}

                          {/* Text and icon on top */}
                          <span className="relative z-10 flex items-center w-24 justify-center">
                            {user.is_verified ? (
                              <button
                                onClick={() => { fadingOut[user.id] && undoVerify(user.id) }}
                                className='flex items-center justify-center w-full h-full'
                              >
                                <X size={16} className="mr-1" />
                                Unverify
                              </button>
                            ) : (
                              <>
                                <Check size={16} className="mr-1" />
                                Verify
                              </>
                            )}
                          </span>
                        </button>
                        {/* {fadingOut[user.id] && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => undoVerify(user.id)}
                              className="text-sm px-2 py-1 border border-gray-400 rounded hover:border-white hover:text-white transition"
                            >
                              Cancel
                            </button>
                          </div>
                        )} */}
                        <button
                          onClick={() => hideUser(user.id)}
                          className="inline-flex items-center px-3 py-1 rounded border border-gray-400 text-gray-400 hover:text-white hover:border-white transition"
                        >
                          <EyeOff size={16} className="mr-1" />
                          Hide
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
    </>
  );
}
