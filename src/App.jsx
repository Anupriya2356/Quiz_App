import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Building, Plus, Home, List, Search, Filter } from 'lucide-react';

// Navigation component
const Navigation = ({ currentPage, setCurrentPage, jobsCount }) => (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Briefcase className="w-8 h-8" />
          Job Board
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentPage('home')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'home' ? 'bg-blue-800' : 'hover:bg-blue-700'
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <button
            onClick={() => setCurrentPage('add')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'add' ? 'bg-blue-800' : 'hover:bg-blue-700'
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Job
          </button>
          <button
            onClick={() => setCurrentPage('jobs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'jobs' ? 'bg-blue-800' : 'hover:bg-blue-700'
            }`}
          >
            <List className="w-4 h-4" />
            All Jobs ({jobsCount})
          </button>
        </div>
      </div>
    </nav>
  );

// Home Page
const HomePage = ({ setCurrentPage }) => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to Job Board
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find your dream job or post opportunities for talented professionals. 
            Your career journey starts here!
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setCurrentPage('jobs')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Browse Jobs
            </button>
            <button
              onClick={() => setCurrentPage('add')}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Post a Job
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div 
              onClick={() => setCurrentPage('jobs')}
              className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="flex justify-center mb-4">
                <Briefcase className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Quality Jobs</h3>
              <p className="text-gray-600">Discover opportunities from top companies</p>
            </div>
            <div 
              onClick={() => setCurrentPage('add')}
              className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="flex justify-center mb-4">
                <Building className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Easy Posting</h3>
              <p className="text-gray-600">Post jobs in minutes with our simple form</p>
            </div>
            <div 
              onClick={() => setCurrentPage('jobs')}
              className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="flex justify-center mb-4">
                <MapPin className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Location Based</h3>
              <p className="text-gray-600">Find jobs in your preferred location</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

// Add Job Page
const AddJobPage = ({ jobForm, handleInputChange, handleAddJob }) => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Post a New Job</h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={jobForm.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Software Engineer"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company"
                  value={jobForm.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Tech Solutions Inc."
                  required
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={jobForm.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Mumbai, India"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    name="type"
                    value={jobForm.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary (Optional)
                </label>
                <input
                  type="text"
                  name="salary"
                  value={jobForm.salary}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., ₹5-8 LPA"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  name="description"
                  value={jobForm.description}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the role, requirements, and benefits..."
                  required
                />
              </div>
              
              <button
                type="button"
                onClick={handleAddJob}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Post Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

// All Jobs Page
const AllJobsPage = ({ 
  jobs, 
  filteredJobs, 
  searchTerm, 
  setSearchTerm, 
  locationFilter, 
  setLocationFilter, 
  sortBy, 
  setSortBy, 
  uniqueLocations 
}) => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Jobs</h2>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Jobs
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search by title, company, or description"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Location
              </label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Locations</option>
                {uniqueLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
                <option value="company">Company A-Z</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No jobs found</h3>
            <p className="text-gray-500">
              {jobs.length === 0 ? 'Be the first to post a job!' : 'Try adjusting your search criteria'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                    <div className="flex items-center gap-4 text-gray-600 text-sm">
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {job.type}
                    </span>
                    <div className="text-sm text-gray-500 mt-1">
                      Posted: {job.datePosted}
                    </div>
                  </div>
                </div>
                
                {job.salary && (
                  <div className="text-green-600 font-semibold mb-3">
                    Salary: {job.salary}
                  </div>
                )}
                
                <p className="text-gray-700 leading-relaxed">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

const JobBoard = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Job form state
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: '',
    type: 'Full-time'
  });

  // Load jobs from memory on component mount
  useEffect(() => {
    const savedJobs = localStorage.getItem('jobBoardJobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, []);

  // Save jobs to memory whenever jobs change
  useEffect(() => {
    localStorage.setItem('jobBoardJobs', JSON.stringify(jobs));
  }, [jobs]);

  // Handle form input changes - FIXED
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Fixed: use e.target instead of just e
    setJobForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new job
  const handleAddJob = () => {
    if (jobForm.title && jobForm.company && jobForm.location && jobForm.description) {
      const newJob = {
        id: Date.now(),
        ...jobForm,
        datePosted: new Date().toISOString().split('T')[0],
        timestamp: Date.now()
      };
      setJobs(prev => [newJob, ...prev]);
      setJobForm({
        title: '',
        company: '',
        location: '',
        description: '',
        salary: '',
        type: 'Full-time'
      });
      alert('Job successfully added!');
    } else {
      alert('Please fill all required fields');
    }
  };

  // Filter and sort jobs
  const filteredJobs = jobs
    .filter(job => {
      // Search filter
      const searchMatch = searchTerm === '' || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Location filter
      const locationMatch = locationFilter === '' || 
        job.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      return searchMatch && locationMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.timestamp - a.timestamp;
      if (sortBy === 'oldest') return a.timestamp - b.timestamp;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'company') return a.company.localeCompare(b.company);
      return 0;
    });

  // Get unique locations for filter
  const uniqueLocations = [...new Set(jobs.map(job => job.location))];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        jobsCount={jobs.length} 
      />
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'add' && (
        <AddJobPage 
          jobForm={jobForm} 
          handleInputChange={handleInputChange} 
          handleAddJob={handleAddJob} 
        />
      )}
      {currentPage === 'jobs' && (
        <AllJobsPage 
          jobs={jobs}
          filteredJobs={filteredJobs}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          uniqueLocations={uniqueLocations}
        />
      )}
    </div>
  );
};

export default JobBoard;