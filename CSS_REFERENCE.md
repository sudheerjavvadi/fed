# Admin Portal CSS Reference

## Quick Class Reference

### Admin Container
```css
.admin-container { }              /* Main container for all admin pages */
.admin-page-title { }             /* Page heading (h1) */
```

### Analytics Page
```css
.admin-analytics-container { }    /* Analytics root container */
.analytics-header { }             /* Header section */
.stats-grid { }                   /* 4-column responsive grid */
.stat-card { }                    /* Individual stat card */
.stat-icon { }                    /* Icon container (60x60px) */
.stat-content { }                 /* Text content wrapper */
.stat-value { }                   /* Large number (2em) */
.stat-label { }                   /* Description text */
.charts-section { }               /* 2-column charts grid */
.chart-card { }                   /* Single chart container */
.chart-placeholder { }            /* Placeholder for real charts */
.detailed-stats { }               /* Performance table container */
.stats-table { }                  /* Table styling */
.stats-table thead th { }         /* Header cells */
.stats-table tbody td { }         /* Data cells */
.badge { }                        /* Badge base styles */
.badge-success { }                /* Green success badge */
.badge-warning { }                /* Orange warning badge */
.badge-info { }                   /* Blue info badge */
```

### Student Management Page
```css
.filter-section { }               /* Filter buttons container */
.filter-btn { }                   /* Filter button */
.filter-btn.active { }            /* Active filter button */
.table-container { }              /* Table wrapper with scroll */
.admin-table { }                  /* Table base styles */
.admin-table thead th { }         /* Table headers */
.admin-table tbody td { }         /* Table cells */
.progress-bar { }                 /* Progress bar container */
.progress-fill { }                /* Animated progress bar */
.progress-text { }                /* Progress percentage text */
.status-badge { }                 /* Status indicator base */
.status-badge.active { }          /* Active status (green) */
.status-badge.inactive { }        /* Inactive status (red) */
.action-btn { }                   /* Button base styles */
.action-btn.view { }              /* View button (blue) */
.action-btn.message { }           /* Message button (purple) */
.empty-message { }                /* Empty state message */
```

### Reports Page
```css
.report-config { }                /* Configuration area */
.config-group { }                 /* Config form group */
.button-group { }                 /* Button group container */
.btn-export { }                   /* Export button base */
.csv-btn { }                      /* CSV export (green) */
.pdf-btn { }                      /* PDF export (red) */
.report-preview { }               /* Report display area */
.report-content { }               /* Report content container */
.report-table { }                 /* Report table styling */
.progress-bar-small { }           /* Inline progress bar */
```

### Settings Page
```css
.settings-section { }             /* Settings group container */
.settings-title { }               /* Section heading */
.settings-group { }               /* Form group */
.settings-group label { }         /* Form label */
.settings-group input { }         /* Text input styling */
.settings-group select { }        /* Select dropdown styling */
.settings-toggle { }              /* Checkbox container */
.settings-toggle label { }        /* Checkbox label with flex */
.settings-toggle input[type="checkbox"] { } /* Checkbox styling */
.setting-description { }          /* Toggle description text */
.btn-danger { }                   /* Danger action button */
.btn-save { }                     /* Primary save button */
.settings-actions { }             /* Button container */
.success-message { }              /* Success notification */
```

### Dashboard
```css
.admin-dashboard-layout { }       /* Main layout container */
.sidebar { }                      /* Left sidebar */
.sidebar-header { }               /* Sidebar header */
.sidebar-nav { }                  /* Navigation menu */
.nav-item { }                     /* Navigation item */
.nav-item.active { }              /* Active nav item */
.admin-user-info { }              /* User info section */
.dashboard-content { }            /* Main content area */
.dashboard-header-bar { }         /* Top bar with logout */
.logout-button { }                /* Logout button */
.dashboard-title { }              /* Page title */
.dashboard-section-header { }     /* Section header with button */
.workshop-table { }               /* Workshop table */
```

## Color Values

```css
/* Primary Colors */
--primary-color: #6a1b9a;         /* Deep purple */
--primary-dark: #5a148a;          /* Darker purple for hover */
--primary-light: #9c27b0;         /* Lighter purple for gradients */

/* Status Colors */
--success-bg: #c8e6c9;            /* Light green */
--success-text: #2e7d32;          /* Dark green */
--warning-bg: #ffe0b2;            /* Light orange */
--warning-text: #e65100;          /* Dark orange */
--info-bg: #bbdefb;               /* Light blue */
--info-text: #1565c0;             /* Dark blue */
--danger-bg: #f44336;             /* Red */
--danger-text: #ffffff;           /* White on red */

/* Base Colors */
--text-dark: #333;                /* Dark text */
--text-light: #666;               /* Light text */
--border-color: #ddd;             /* Border color */
--background-light: #f9f9f9;      /* Light background */
--white: #ffffff;                 /* White */

/* Shadows */
--shadow-light: 0 2px 5px rgba(0, 0, 0, 0.05);
--shadow-medium: 0 4px 20px rgba(0, 0, 0, 0.05);
```

## Typography

```css
/* Headings */
h1, .admin-page-title { font-size: 2em; font-weight: 700; }
h2, .dashboard-title { font-size: 1.5em; font-weight: 700; }
h3 { font-size: 1.3em; font-weight: 700; }

/* Body Text */
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
body { line-height: 1.6; color: var(--text-dark); }

/* Statistics */
.stat-value { font-size: 2em; font-weight: 700; }
.stat-label { font-size: 0.9em; color: var(--text-light); }
```

## Spacing System

```css
/* Padding */
.admin-container { padding: 30px; }
.card { padding: 25px; }
.button { padding: 12px 20px; }

/* Margins */
h1, .admin-page-title { margin-bottom: 30px; }
.settings-section { margin-bottom: 25px; }
.stats-grid { margin-bottom: 40px; }

/* Gaps */
.stats-grid { gap: 20px; }
.charts-section { gap: 30px; }
.filter-section { gap: 15px; }
```

## Responsive Design

### Tablet (max-width: 1024px)
```css
.charts-section {
  grid-template-columns: 1fr;  /* Single column */
}
```

### Mobile (max-width: 768px)
```css
.admin-container { padding: 20px; }
.admin-page-title { font-size: 1.5em; }
.stats-grid { grid-template-columns: 1fr; }
.stat-card { flex-direction: column; text-align: center; }
.report-config { grid-template-columns: 1fr; }
.button-group { flex-direction: column; }
.admin-table { font-size: 0.9em; }
```

## Interactive States

### Buttons
```css
.btn { transition: all 0.2s; }
.btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-medium); }
.btn:active { transform: translateY(0); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
```

### Inputs
```css
input:focus, select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(106, 27, 154, 0.1);
}
```

### Tables
```css
.admin-table tbody tr:hover { background: var(--background-light); }
.stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-medium); }
```

## Gradient Usage

```css
.stat-icon {
  background: linear-gradient(135deg, var(--primary-color), #9c27b0);
}

.progress-fill {
  background: linear-gradient(90deg, var(--primary-color), #9c27b0);
}
```

## Layout Patterns

### Grid Layouts
```css
/* 4-Column Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* 2-Column Charts Grid */
.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
}

/* Form Grid */
.report-config {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

### Flexbox Layouts
```css
/* Sidebar Navigation */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Filter Buttons */
.filter-section {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

/* Stat Card */
.stat-card {
  display: flex;
  align-items: center;
  gap: 20px;
}
```

## Animation & Transitions

```css
/* Smooth Transitions */
transition: all 0.2s;           /* Default fast transition */
transition: background-color 0.2s;
transition: border-color 0.2s;
transition: width 0.3s;         /* Progress bar animation */
transition: transform 0.2s;     /* Button lift effect */
```

## Border Radius System

```css
--card-border-radius: 8px;      /* Cards and containers */
border-radius: 6px;              /* Buttons and inputs */
border-radius: 20px;             /* Badges and pills */
border-radius: 50%;              /* Circular icons */
```

## Box Shadow System

```css
--shadow-light: 0 2px 5px rgba(0, 0, 0, 0.05);   /* Subtle shadow */
--shadow-medium: 0 4px 20px rgba(0, 0, 0, 0.05); /* Hover shadow */
```

## Width & Height

```css
.stat-icon { width: 60px; height: 60px; }
.progress-bar { height: 20px; }
.progress-bar-small { height: 10px; width: 80px; }
.chart-placeholder { height: 300px; }
```

## Customization Guide

### Change Primary Color
```css
:root {
  --primary-color: #YOUR_COLOR;
}
```

### Change Text Color
```css
:root {
  --text-dark: #YOUR_COLOR;
  --text-light: #YOUR_COLOR;
}
```

### Adjust Spacing
```css
/* Global padding adjustment */
.admin-container { padding: 40px; /* was 30px */ }

/* Gap adjustment */
.stats-grid { gap: 30px; /* was 20px */ }
```

### Dark Mode Ready
```css
/* Add to support dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --text-dark: #f0f0f0;
    --background-light: #1a1a1a;
    --border-color: #444;
  }
}
```

---

**CSS Version:** 1.0  
**Total Lines:** 900+  
**Last Updated:** 2024  
**Maintenance:** All admin pages use consistent CSS classes and variables
