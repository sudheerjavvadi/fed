import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AdminReports() {
  const { registrations } = useAuth();
  const [reportType, setReportType] = useState('workshops');
  const [dateRange, setDateRange] = useState('30days');

  const generateCSV = () => {
    const csvContent = reportType === 'workshops' 
      ? 'Workshop,Registrations,Completion Rate\nAdvanced React,42,78%\nUI/UX Design,35,65%'
      : 'Student,Workshops,Progress\nStudent 1,2,75%\nStudent 2,1,50%';
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    element.setAttribute('download', `report_${reportType}_${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generatePDF = () => {
    alert(`PDF report for ${reportType} would be generated with date range: ${dateRange}`);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-page-title">Reports & Analytics</h1>

      {/* Report Configuration */}
      <div className="report-config">
        <div className="config-group">
          <label>Report Type</label>
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="workshops">Workshop Performance</option>
            <option value="students">Student Progress</option>
            <option value="enrollments">Enrollment Trends</option>
            <option value="completion">Completion Rates</option>
          </select>
        </div>

        <div className="config-group">
          <label>Date Range</label>
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        <div className="config-group">
          <label>&nbsp;</label>
          <div className="button-group">
            <button className="btn-export csv-btn" onClick={generateCSV}>
              📊 Export CSV
            </button>
            <button className="btn-export pdf-btn" onClick={generatePDF}>
              📄 Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="report-preview">
        <h2>Report Preview</h2>
        {reportType === 'workshops' && (
          <div className="report-content">
            <h3>Workshop Performance Report</h3>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Workshop Name</th>
                  <th>Total Registrations</th>
                  <th>Completed</th>
                  <th>In Progress</th>
                  <th>Completion Rate</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Advanced React</td>
                  <td>42</td>
                  <td>33</td>
                  <td>9</td>
                  <td><span className="badge-success">78%</span></td>
                  <td>⭐ 4.5/5</td>
                </tr>
                <tr>
                  <td>UI/UX Design</td>
                  <td>35</td>
                  <td>23</td>
                  <td>12</td>
                  <td><span className="badge-warning">65%</span></td>
                  <td>⭐ 4.2/5</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {reportType === 'students' && (
          <div className="report-content">
            <h3>Student Progress Report</h3>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Workshops Enrolled</th>
                  <th>Completed</th>
                  <th>Overall Progress</th>
                  <th>Last Activity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Student 1</td>
                  <td>2</td>
                  <td>1</td>
                  <td>
                    <div className="progress-bar-small">
                      <div className="progress-fill" style={{ width: '75%' }}></div>
                    </div>75%
                  </td>
                  <td>2 hours ago</td>
                </tr>
                <tr>
                  <td>Student 2</td>
                  <td>1</td>
                  <td>0</td>
                  <td>
                    <div className="progress-bar-small">
                      <div className="progress-fill" style={{ width: '50%' }}></div>
                    </div>50%
                  </td>
                  <td>1 day ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {reportType === 'enrollments' && (
          <div className="report-content">
            <h3>Enrollment Trends</h3>
            <div className="chart-placeholder">
              <p>📈 Enrollment trend chart would be displayed here</p>
              <p>Showing registrations over selected date range</p>
            </div>
          </div>
        )}

        {reportType === 'completion' && (
          <div className="report-content">
            <h3>Completion Rate Analysis</h3>
            <div className="chart-placeholder">
              <p>📊 Completion rate visualization would be displayed here</p>
              <p>By workshop and by time period</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
