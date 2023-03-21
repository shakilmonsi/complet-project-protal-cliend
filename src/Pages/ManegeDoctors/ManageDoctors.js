import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ConprarmationMadul from "../Shared/ConparmationMadul/ConprarmationMadul";
import Loading from "../Shared/Loading/Loading";

const ManageDoctors = () => {
  const [deletingDoctor, setDeletingDoctors] = useState(null);
  const closeModal = () => {
    setDeletingDoctors(null);
  };
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/doctors", {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {}
    },
  });
  const handleDeleteDoctor = (doctor) => {
    fetch(`http://localhost:5000/doctors/${doctor._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Doctor ${doctor.name} deleted successfully`);
        }
      });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-full">
      <h3 className="text-3xl font-bold">ADD A DOCTOR{doctors?.length}</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr className="w-full">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th> Specialty</th>
              <th> Action</th>
              <th> DELETE DOCTORS</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {doctors.map((doctor, i) => (
              <tr key={doctor._id}>
                <th>{i + 1}</th>
                <th>
                  <div className="avatar">
                    <div className="w-24 mask mask-triangle">
                      <img src={doctor.image} alt="" />
                    </div>
                  </div>
                </th>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.specialty}</td>
                <td>{doctor.action}</td>
                <label
                  onClick={() => setDeletingDoctors(doctor)}
                  htmlFor="confirmation-modal"
                  className="btn btn-sm btn-error"
                >
                  DELETE
                </label>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingDoctor && (
        <ConprarmationMadul
          title={`are you sure you want to delete`}
          message={`If you delete ${deletingDoctor.name}.It cannot be undone`}
          successAction={handleDeleteDoctor}
          modalData={deletingDoctor}
          successButtonName="Delete"
          closeModal={closeModal}
        ></ConprarmationMadul>
      )}
    </div>
  );
};

export default ManageDoctors;
