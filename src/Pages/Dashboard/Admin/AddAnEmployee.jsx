import { useState } from 'react';
import Select from 'react-select';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';
import useHr from '../../../hooks/useHr';





const AddAnEmployee = () => {
    
    const [hrData]=useHr();
    const logo=hrData?.logo;
    const axiosSecure = useAxiosSecure();
    const {refetch, data: employees = [] } = useQuery({
        queryKey: ['not-affiliated'],
        queryFn: async () => {
            const res = await axiosSecure.get('/employees');
            return res.data;
        }
    });

    // State to manage selected employees
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    // Map employees to react-select options
    const employeeOptions = employees.map(employee => ({
        value: employee._id,
        label: employee.name
    }));

    // Handle multi-select change
    const handleEmployeeChange = (selectedOptions) => {
        setSelectedEmployees(selectedOptions);
    };

    // Function to add selected employees to the HR database
    const handleAddEmployees = async () => {
        const employeeIds = selectedEmployees.map(emp => emp.value);
        try {
           await axiosSecure.post('/add-employees-to-hr', { employeeIds,logo });

           Swal.fire({
            icon: 'success',
            title: 'Employees Added!',
            text: 'The selected employees have been added successfully.',
            confirmButtonText: 'OK'
        });


            refetch();
        setSelectedEmployees([]);
        
            // Optionally update UI, reset selection, etc.
        } catch (error) {
            console.error('Error adding employees:', error);

            Swal.fire({
                icon: 'error',
                title: 'Failed to Add Employees',
                text: 'There was an issue adding the employees. Please try again.',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div>


            <h1 className='text-2xl font-bold text-center py-5' >Add An Employee</h1>

            <h2>Add Employees</h2>
            <Select
                isMulti
                name="employees"
                options={employeeOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleEmployeeChange}
            />
            <button
                onClick={handleAddEmployees}
                className="btn btn-primary mt-4"
            >
                Add Selected Employees
            </button>

            {/* Display the table */}
            <div className="overflow-x-auto mt-6">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee._id}>
                                <td>{employee.name}</td>
                                <td>Not Affiliated</td>
                                <td>{employee.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddAnEmployee;
