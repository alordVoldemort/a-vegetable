import React, { useState } from 'react';
import CustomEntry from './models/CustomEntry'; // Adjust the path as per your file structure
import projectTable from './data/projectsTableData'; // Adjust the path as per your file structure

const ParentComponent = () => {
  const [data, setData] = useState(projectTable.rows);  
  const [isCustomEntryOpen, setIsCustomEntryOpen] = useState(false);

  const handleCustomEntrySubmit = (formData) => {
    const newRow = {
      Name: formData.city,
      Email: formData.client,
      Phone: formData.driver
    };
    setData([...data, newRow]);
    setIsCustomEntryOpen(false); // Close the CustomEntry form after submission
  };

  const handleCloseCustomEntry = () => {
    setIsCustomEntryOpen(false); // Close the CustomEntry form when canceled
  };

  return (
    <div>
      {/* Button to open CustomEntry */}
      <button onClick={() => setIsCustomEntryOpen(true)}>Add Entry</button>
      
      {/* Render CustomEntry with appropriate props */}
      <CustomEntry isOpen={isCustomEntryOpen} onClose={handleCloseCustomEntry} onSubmit={handleCustomEntrySubmit} />

      {/* Render projectTable component with the updated data */}
      <ProjectTable rows={data} />
    </div>
  );
};
export default ParentComponent;
