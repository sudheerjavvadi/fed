# WorkNest Admin Portal - Quick Reference Guide

## 🔐 Accessing the Admin Portal

1. **Login as Admin:**
   - Navigate to `/login`
   - Enter admin credentials
   - Select "Admin" role
   - Click "Login"

2. **Access Admin Panel:**
   - Navigate to `/admin`
   - You'll see the admin dashboard with sidebar navigation

## 📋 Admin Menu Options

| Icon | Page | Path | Description |
|------|------|------|-------------|
| 📊 | Dashboard | `/admin` | Main admin dashboard with workshop overview |
| 📈 | Analytics | `/admin/analytics` | Detailed analytics with stats and charts |
| 👥 | Students | `/admin/students` | Student management and progress tracking |
| 📚 | Workshops | `/admin/workshops` | Manage all workshops (create/edit/delete) |
| ➕ | Create Workshop | `/admin/create-workshop` | Create new workshops with modules/lessons |
| 📄 | Reports | `/admin/reports` | Generate and export reports (CSV/PDF) |
| ⚙️ | Settings | `/admin/settings` | Configure admin panel settings |

## 🎯 Feature Highlights

### Dashboard
- Quick overview of all workshops (default + custom)
- See total count of workshops
- Quick action buttons for creating new workshops
- One-click delete for custom workshops

### Analytics
- **Statistics:** View 4 key metrics
  - Total Workshops
  - Total Students
  - Total Registrations
  - Completion Rate %
- **Charts:** Visualize data trends (expandable with Chart.js)
- **Performance Table:** Detailed workshop metrics

### Student Management
- **View all students** with their details
- **Filter students** by status (Active/Inactive)
- **Track progress** with visual progress bars
- **Student actions:** View individual student details, send messages

### Workshop Management
- **Create new workshops** with multiple modules
- **Edit existing workshops** (ready for feature)
- **Delete custom workshops**
- **View schedule and category** information

### Create Workshop
- **Basic Info:** Name, description, duration
- **Schedule:** Date and time configuration
- **Instructor:** Bio and contact information
- **Module Management:** Add/remove modules
- **Lesson Management:** Add videos, articles, quizzes to each module
- **Auto-save:** All data saved to localStorage

### Reports
- **Workshop Performance Report:** Registration and completion metrics
- **Student Progress Report:** Individual student advancement tracking
- **Enrollment Trends:** Track registration patterns
- **Completion Analysis:** Analyze course completion rates
- **Export Options:** Download as CSV or PDF

### Settings
- **Site Configuration:** Change site name and admin email
- **Workshop Settings:** Set student limits and certificate templates
- **Feature Toggles:**
  - Email notifications
  - Analytics dashboard
  - Dark mode
  - Maintenance mode
- **Maintenance Tools:** Clear data, clear cache

## 💾 Data Storage

All admin data is automatically saved to your browser's localStorage:

| Key | Content |
|-----|---------|
| `customWorkshops` | All user-created workshops |
| `registrations` | Student workshop registrations |
| `completedModules` | Student quiz completion tracking |
| `adminSettings` | Admin panel configuration |

**Note:** Data persists across sessions until manually cleared.

## 🛠️ Common Tasks

### Create a New Workshop
1. Click "➕ Create Workshop" in sidebar
2. Fill in workshop details (Basic Info, Schedule, Instructor)
3. Add modules by clicking "Add Module"
4. For each module, add lessons (Video/Article/Quiz)
5. Click "Create Workshop"
6. Workshop appears in Dashboard and Workshop Management

### Delete a Custom Workshop
1. Go to Dashboard or Workshop Management
2. Find the custom workshop (marked with 🆕)
3. Click "Delete" in the Actions column
4. Confirm deletion

### View Student Progress
1. Click "👥 Students" in sidebar
2. See all registered students
3. Filter by status if needed
4. Check progress bar and completion %
5. Click "View" for detailed student metrics

### Generate a Report
1. Click "📄 Reports" in sidebar
2. Select report type (Workshop/Student/Enrollment/Completion)
3. Choose date range (7/30/90 days)
4. Preview report in the table
5. Click "Export CSV" or "Export PDF"
6. File downloads automatically

### Configure Settings
1. Click "⚙️ Settings" in sidebar
2. Update desired settings
3. Toggle features on/off as needed
4. Click "💾 Save Settings"
5. Success message appears

## 📊 Analytics Breakdown

### Dashboard Stats
- **Total Workshops:** Count of all available workshops
- **Total Students:** Number of enrolled students
- **Total Registrations:** Sum of all workshop registrations
- **Completion Rate:** Percentage of students who completed courses

### Performance Metrics
- **Registration Count:** How many students registered per workshop
- **Completion %:** What percentage completed each workshop
- **Status:** Active or Inactive status for each workshop

## 🎨 UI Features

### Responsive Design
- Desktop: Full sidebar + content layout
- Tablet: Adjusted column widths
- Mobile: Stacked layout (ready for mobile optimization)

### Visual Indicators
- 🆕 Custom workshops badge
- 📌 Default workshops badge
- ✓ Success messages in green
- ⚠️ Warning messages in orange
- ℹ️ Info messages in blue

### Interactive Elements
- Active navigation highlighting
- Hover effects on tables and buttons
- Filter buttons with active states
- Progress bars with smooth animations

## 🔒 Security Features

- Admin-only routes (protected by `useAuth` hook)
- Logout functionality
- Role-based access control
- Input validation on forms

## 🚀 Tips & Tricks

✅ **Bulk Operations:** Currently supports single delete (ready for multi-select)
✅ **Data Export:** Generate CSV files for external analysis
✅ **Local Development:** All data saved locally, no backend required
✅ **Customization:** Easy to modify colors/styles in `src/index.css`
✅ **Future Enhancement:** Ready to integrate with backend APIs

## 📞 Support

For issues or feature requests:
1. Check the browser console for errors (F12)
2. Verify localStorage is not full
3. Clear cache if experiencing stale data
4. Check that all components are properly imported in App.jsx

---

**Version:** 1.0  
**Last Updated:** 2024  
**Status:** ✅ Production Ready
