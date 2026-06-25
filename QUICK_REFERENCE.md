# Quick Reference - UI Components Cheat Sheet

## 🔧 Common Imports

```jsx
// All UI Components in one import
import { 
  Button, 
  Card, CardHeader, CardTitle, CardContent, CardFooter,
  Badge, StatusBadge,
  Input, Select, TextArea,
  StatCard, ProjectCard, UserCard,
  Alert,
  DataTable,
  PageHeader, PageContainer, PageSection,
  EmptyState, LoadingState
} from "@/components/ui";

// Layout
import { PageHeader, PageContainer, PageSection } from "@/components/layout/PageLayout";

// Icons (lucide-react)
import { Plus, Edit2, Trash2, Download, Users, Star, ... } from "lucide-react";
```

## 📝 Component Usage

### Button
```jsx
// Primary button
<Button variant="primary" size="lg" onClick={handleClick}>Save</Button>

// With icon
<Button icon={Plus}>Add New</Button>

// Loading state
<Button loading>Processing...</Button>

// Danger button
<Button variant="danger" icon={Trash2}>Delete</Button>

// Outline style
<Button variant="outline">Cancel</Button>
```

### Card
```jsx
<Card hoverable gradient>
  <CardHeader>
    <CardTitle>My Card</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Form Inputs
```jsx
// Text input
<Input 
  label="Email" 
  icon={Mail} 
  error="Invalid email"
  hint="We'll never share your email"
  placeholder="you@example.com"
/>

// Select dropdown
<Select 
  label="Role"
  options={[
    {value: 'student', label: 'Student'},
    {value: 'teacher', label: 'Teacher'},
    {value: 'admin', label: 'Admin'}
  ]}
/>

// Text area
<TextArea 
  label="Description"
  placeholder="Enter your description"
  rows={4}
/>
```

### Badges & Status
```jsx
// Status badge
<StatusBadge status="pending" /> // auto-styled
<StatusBadge status="approved" />
<StatusBadge status="rejected" />
<StatusBadge status="completed" />

// Custom badge
<Badge variant="success">Approved</Badge>
<Badge variant="danger">Rejected</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="info">Info</Badge>
```

### Data Cards
```jsx
// Stat card
<StatCard 
  title="Total Students"
  value={156}
  description="Active enrolled students"
  icon={Users}
  variant="primary"
  trend={12} // positive trend percentage
/>

// Project card
<ProjectCard
  title="AI Research"
  description="Building intelligent systems"
  status="inProgress"
  progress={75}
  supervisor="Dr. Smith"
  deadline="2026-12-31"
  onClick={() => navigate('/project/1')}
/>

// User card
<UserCard
  name="John Doe"
  email="john@university.edu"
  role="Student"
  department="Computer Science"
  avatar="https://..."
  onClick={() => navigate('/profile/1')}
/>
```

### Alerts
```jsx
<Alert 
  variant="success" 
  title="Success!" 
  message="Your changes were saved"
  closeable
/>

<Alert 
  variant="error" 
  message="An error occurred while processing"
/>

<Alert 
  variant="warning" 
  message="This action cannot be undone"
/>
```

### Data Table
```jsx
const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { 
    key: 'role', 
    label: 'Role',
    render: (value) => <Badge variant="primary">{value}</Badge>
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (_, row) => (
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" icon={Edit2} onClick={() => handleEdit(row._id)} />
        <Button size="sm" variant="danger" icon={Trash2} onClick={() => handleDelete(row._id)} />
      </div>
    )
  }
];

<DataTable 
  columns={columns}
  data={students}
  searchable
  searchKeys={['name', 'email']}
  paginated
  pageSize={10}
  onRowClick={(row) => navigate(`/student/${row._id}`)}
/>
```

### Page Layout
```jsx
<PageContainer>
  <PageHeader 
    title="Students"
    subtitle="Manage all student accounts"
    icon={Users}
    badge="24 Active"
    actions={[
      { label: 'Add Student', icon: Plus, variant: 'primary', onClick: handleAdd },
      { label: 'Export CSV', icon: Download, variant: 'secondary', onClick: handleExport }
    ]}
  />
  
  {/* Stats */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <StatCard title="Total" value={100} icon={Users} />
    <StatCard title="Active" value={85} icon={CheckCircle} />
    <StatCard title="Pending" value={15} icon={Clock} />
  </div>
  
  {/* Content */}
  <PageSection title="All Students" description="View and manage students">
    <DataTable columns={columns} data={data} searchable paginated />
  </PageSection>
</PageContainer>
```

## 🎨 Styling Quick Reference

### Common Tailwind Classes

```jsx
// Spacing
className="p-6"          // padding
className="space-y-4"    // vertical spacing between children
className="gap-6"        // gap in grids/flex

// Grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Flexbox
className="flex items-center justify-between"
className="flex gap-4"

// Text
className="heading-lg"   // large heading
className="heading-md"   // medium heading
className="body"         // normal text
className="body-lg"      // larger text
className="text-tiny"    // small text

// Colors (use with text, bg, border, etc.)
className="text-blue-600"
className="bg-emerald-100"
className="border border-slate-200"

// Dark mode
className="dark:bg-slate-900"
className="dark:text-white"

// Hover/Active
className="hover:bg-blue-50"
className="active:scale-95"
className="transition-all"
```

### Status Color Classes

```jsx
// Pending (amber)
bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300

// Approved (emerald)
bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300

// Completed (blue)
bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300

// Rejected (rose)
bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300

// In Progress (cyan)
bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300
```

## 🎬 Animation Classes

```jsx
// Floating effect
className="animate-float"

// Gradient shift
className="animate-gradient"

// Soft pulse
className="animate-pulse-soft"

// Shimmer (loading)
className="animate-shimmer skeleton"

// Slide in entrance
className="list-item-animation"

// Hover lift
className="hover-lift"

// Glow effects
className="glow-blue"
className="glow-emerald"
className="glow-rose"
className="glow-amber"
```

## 🔄 Common Patterns

### List with Empty/Loading States
```jsx
{loading ? (
  <LoadingState label="Loading data..." />
) : data.length === 0 ? (
  <EmptyState 
    icon={InboxIcon} 
    title="No Data"
    description="Start by creating a new item"
  />
) : (
  <DataTable columns={columns} data={data} />
)}
```

### Form with Validation
```jsx
const [formData, setFormData] = useState({ name: '', email: '' });
const [errors, setErrors] = useState({});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({...prev, [name]: value}));
  if (errors[name]) setErrors(prev => ({...prev, [name]: ''}));
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Validation logic
  if (!isValid) return;
  // Submit logic
};

// In JSX:
<form onSubmit={handleSubmit} className="space-y-6">
  <Input
    label="Name"
    name="name"
    value={formData.name}
    onChange={handleChange}
    error={errors.name}
    icon={User}
  />
  <Input
    label="Email"
    name="email"
    type="email"
    value={formData.email}
    onChange={handleChange}
    error={errors.email}
    icon={Mail}
  />
  <Button type="submit" fullWidth>Save</Button>
</form>
```

### Two Column Layout
```jsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Main content - 2/3 width */}
  <div className="lg:col-span-2">
    <PageSection title="Main Content">
      {/* Main content here */}
    </PageSection>
  </div>
  
  {/* Sidebar - 1/3 width */}
  <div>
    <PageSection title="Sidebar">
      {/* Sidebar content here */}
    </PageSection>
  </div>
</div>
```

### Stats Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <StatCard title="Stat 1" value={100} icon={Icon1} variant="primary" />
  <StatCard title="Stat 2" value={200} icon={Icon2} variant="success" />
  <StatCard title="Stat 3" value={300} icon={Icon3} variant="danger" />
  <StatCard title="Stat 4" value={400} icon={Icon4} variant="warning" />
</div>
```

## 🚀 Pro Tips

1. **Always use variants**: `variant="primary"` instead of custom styling
2. **Use size props**: `size="lg"` instead of custom sizing
3. **Combine components**: Stack them for complex UIs
4. **Test dark mode**: All components support it
5. **Mobile first**: Design for mobile, enhance for desktop
6. **Use icons meaningfully**: Icons should enhance UX, not clutter
7. **Loading states**: Always show feedback for async operations
8. **Empty states**: Always handle the empty data case
9. **Animations**: Use to guide attention, not distract
10. **Accessibility**: Provide aria-labels for icon-only buttons

## 📚 Full Documentation

For complete details, see:
- `UI_IMPLEMENTATION_GUIDE.md` - Full implementation guide
- `COMPREHENSIVE_UI_SUMMARY.md` - Complete overview and next steps

---

Print this page or save it for quick reference while building! 🎨
