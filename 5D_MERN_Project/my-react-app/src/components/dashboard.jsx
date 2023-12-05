// import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState, useEffect} from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  useEffect(()=>{
    if(sessionStorage.getItem('email'))
    {
        // loaderGet();
        navigate("/Dashboard")
    }
    else if(!sessionStorage.getItem('email'))
    {
        navigate("/")
    }
    // navigate("/Dashboard")  
},[])

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && tags.length < 5 && tags.indexOf(tagInput) === -1) {
      setTags((prevTags) => [...prevTags, tagInput]);
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append('title', title);

    // Append tags as an array
    tags.forEach((tag) => {
      formData.append('tags', tag);
    });

    // Append each file to FormData
    files.forEach((file) => {
      formData.append('attachments', file);
    });

    if (title.trim() === '' || tags.length === 0 || files.length === 0) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    try {
      // Send data to the server using axios
      const response = await axios.post('http://localhost:5000/create-moment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      });

      console.log('Moment created successfully:', response.data);
      alert('moment created successfully.');
      setTitle('');
      setTagInput('');
      setTags([]);
      setFiles([]);
      return;
    } catch (error) {
      console.error('Error during form submission:', error);
    }
};

  

  
  return (
    <section className='dashboard-Mytask'>
       <h6><strong>Add New Moment</strong></h6>
       <div>
        <form className='inForm'>
          <div className="form-group mb-2">
              <label className='insideDash'> Title </label>
              <input type="text" className="form-control" placeholder="Enter Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>

          <div className="form-group mb-2">
          <label className='insideDash'> Tags</label>
            <div>
              <input type="text" className="form-control w-50" placeholder="Type and press Enter to add tags" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleInputKeyDown} />
            </div>
          </div>
          <div className='tag-area'>
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button type="button" className='cross-tag' onClick={() => handleTagRemove(tag)}>
                  &times;
                </button>
              </span>
            ))}
          </div>
          
          <label className='insideDash mt-3'> Upload Files </label>
          <div className="custom-file p-1">
            <input type="file" className="custom-file-input" multiple onChange={handleFileChange} />
          </div>      

          <ul className='ul-file'>
            {files.map((file, index) => (
              <li className='li-file' key={index}>
                <Icon icon="bx:file" />
                {file.name}
                <button type="button" className='img-cross' onClick={() => handleRemoveFile(index)}>
                  X
                </button>
              </li>
            ))}
          </ul>

          <div className='text-center'>
             <button type="button" className='btn btn-primary submtibtn' onClick={handleSubmit}>Submit</button>
          </div>
          
        </form>
      </div>
    </section>
  );
};

export default Dashboard;