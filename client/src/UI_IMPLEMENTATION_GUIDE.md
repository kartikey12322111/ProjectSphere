# ProjectSphere - Unified UI/UX Implementation Guide

## Overview
This guide provides a complete framework for implementing a consistent, beautiful, and interactive UI across all ProjectSphere pages.

## Created Components

### 1. **Button Component** (`components/ui/Button.jsx`)
Variants: primary, secondary, danger, success, outline, ghost
Sizes: sm, md, lg, icon
```jsx
import { Button } from "@/components/ui";

<Button variant="primary" size="lg">Click Me</Button>
<Button variant="danger" loading icon={Trash2}>Delete</Button>
```

### 2. **Card Components** (`components/ui/Card.jsx`)
```jsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui";

<Card hoverable gradient>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer actions</CardFooter>
</Card>
```

### 3. **Form Components** (`components/ui/Input.jsx`)
- Input with icon, label, error, and hint
- Select dropdown
- TextArea
```jsx
import { Input, Select, TextArea } from "@/components/ui";

<Input label="Email" icon={Mail} error="Invalid email" />
<Select label="Role" options={[{value: 'admin', label: 'Admin'}]} />
<TextArea label="Description" rows={4} />
```

### 4. **Data Display Components** (`components/ui/CardVariants.jsx`)
- **StatCard**: For KPI display with trend
- **ProjectCard**: For project display with progress
- **UserCard**: For user profile display
```jsx
import { StatCard, ProjectCard, UserCard } from "@/components/ui";

<StatCard title="Total Students" value={45} trend={12} variant="success" />
<ProjectCard title="Project Name" status="inProgress" progress={65} />
<UserCard name="John" email="john@uni.edu" role="Student" />
```

### 5. **Badge Component** (`components/ui/Badge.jsx`)
Status variants: success, danger, warning, info, pending, completed, approved, rejected
```jsx
import { Badge, StatusBadge } from "@/components/ui";

<Badge variant="success">Approved</Badge>
<StatusBadge status="pending" />
```

### 6. **Alert Component** (`components/ui/Alert.jsx`)
```jsx
import { Alert } from "@/components/ui";

<Alert variant="success" title="Success!" message="Operation completed" closeable />
<Alert variant="error" message="An error occurred" />
```

### 7. **DataTable Component** (`components/ui/DataTable.jsx`)
```jsx
import { DataTable } from "@/components/ui";

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { 
    key: 'status', 
    label: 'Status', 
    render: (value) => <Badge variant={value}>{value}</Badge>
  },
];

<DataTable 
  columns={columns} 
  data={students}
  searchable
  searchKeys={['name', 'email']}
  paginated
  pageSize={10}
/>
```

### 8. **Page Layout Components** (`components/layout/PageLayout.jsx`)
```jsx
import { PageHeader, PageContainer, PageSection } from "@/components/ui";

<PageContainer>
  <PageHeader 
    title="Students"
    subtitle="Manage student accounts"
    icon={Users}
    badge="24 Active"
    actions={[
      { label: 'Add Student', icon: Plus, variant: 'primary', onClick: handleAdd },
      { label: 'Export', icon: Download, variant: 'secondary', onClick: handleExport }
    ]}
  />
  
  <PageSection title="Overview" description="Key metrics">
    {content}
  </PageSection>
</PageContainer>
```

### 9. **Global Animations & Effects** (`styles/ui-enhancements.css`)
Included animations:
- `animate-float`: Subtle floating effect
- `animate-gradient`: Gradient shift animation
- `animate-pulse-soft`: Soft pulsing
- `animate-shimmer`: Shimmer loading effect
- `animate-slide-in-bottom`: Page entrance animation
- `hover-lift`: Hover lift effect class
- `glow-*`: Glow effects for different colors
- `glass-effect`: Glass morphism

## Page Template Structure

Every page should follow this structure:

```jsx
import { PageHeader, PageContainer, PageSection, Button } from "@/components/ui";
import { Plus, Download } from "lucide-react";

const MyPage = () => {
  return (
    <PageContainer>
      {/* Header with breadcrumbs auto-included */}
      <PageHeader 
        title="Page Title"
        subtitle="Page description"
        icon={IconComponent}
        actions={[
          { label: 'Add New', icon: Plus, onClick: handleAdd }
        ]}
      />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => <StatCard key={stat.id} {...stat} />)}
      </div>
      
      {/* Main Content Sections */}
      <PageSection title="Section Title" description="Description">
        {/* Use DataTable for lists */}
        <DataTable columns={columns} data={data} />
      </PageSection>
      
      {/* Secondary Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PageSection className="lg:col-span-2">
          {/* Main content */}
        </PageSection>
        <PageSection>
          {/* Side content */}
        </PageSection>
      </div>
    </PageContainer>
  );
};

export default MyPage;
```

## Color System

### Status Colors
- **Pending**: `bg-amber-100 text-amber-700` (yellow/orange)
- **Approved**: `bg-emerald-100 text-emerald-700` (green)
- **Completed**: `bg-blue-100 text-blue-700` (blue)
- **Rejected**: `bg-rose-100 text-rose-700` (red)
- **In Progress**: `bg-cyan-100 text-cyan-700` (cyan)

### Role Colors
- **Admin**: `bg-violet-100 text-violet-700` (purple/violet)
- **Teacher**: `bg-blue-100 text-blue-700` (blue)
- **Student**: `bg-emerald-100 text-emerald-700` (green)

## Responsive Grid Patterns

### 2-Column Layout
```jsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <Card>{/* Left content */}</Card>
  <Card>{/* Right content */}</Card>
</div>
```

### 3-Column Dashboard
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</div>
```

### 12-Column Layout (Advanced)
```jsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
  <div className="lg:col-span-8">{/* Main content */}</div>
  <div className="lg:col-span-4">{/* Sidebar */}</div>
</div>
```

## Spacing Conventions

- **Section margins**: `space-y-8` between major sections
- **Card padding**: `p-6 md:p-8` for section cards
- **Container max-width**: `max-w-[1600px] mx-auto`
- **Grid gaps**: `gap-6` for card grids

## Dark Mode

All components automatically support dark mode through Tailwind's `dark:` prefix. No special handling needed!

## Interactive States

### Hover Effects
```jsx
// Use hover-lift class for card elevation
<Card className="hover-lift">Content</Card>

// Or use individual classes
<div className="hover:shadow-xl hover:scale-[1.02] transition-all">
  Interactive Content
</div>
```

### Active States
All buttons automatically include `active:scale-95` for press feedback.

### Loading States
```jsx
<Button loading>Saving...</Button> {/* Shows spinner */}
<DataTable loading /> {/* Shows skeleton */}
```

## Page Refactoring Checklist

For each page, apply these changes:

- [ ] Import PageContainer, PageHeader, PageSection
- [ ] Wrap content in PageContainer
- [ ] Add PageHeader at top with title, icon, and actions
- [ ] Convert stat cards to use StatCard component
- [ ] Replace tables with DataTable component
- [ ] Update buttons to use Button component with variants
- [ ] Replace form inputs with Input/Select/TextArea components
- [ ] Add status badges using StatusBadge component
- [ ] Update alerts to use Alert component
- [ ] Add hover effects and animations
- [ ] Test responsive behavior on mobile/tablet
- [ ] Test dark mode

## Animation Usage

```jsx
// Float effect
<div className="animate-float">Floating content</div>

// Slide in on page load
<div className="list-item-animation">Item</div>

// Pulse effect
<div className="animate-pulse-soft">Pulsing content</div>

// Glow effect
<Card className="glow-blue">Content with blue glow</Card>
```

## Import Statements Template

```jsx
// Components
import { 
  Button, 
  Card, 
  CardHeader, 
  CardContent, 
  Badge, 
  StatusBadge,
  Input,
  Select,
  TextArea,
  StatCard,
  ProjectCard,
  UserCard,
  Alert,
  DataTable,
  PageHeader,
  PageContainer,
  PageSection
} from "@/components/ui";

// Icons
import { Plus, Edit2, Trash2, Download, ... } from "lucide-react";

// Layout
import { PageHeader, PageContainer, PageSection } from "@/components/layout/PageLayout";
```

## Best Practices

1. **Consistency**: Always use the provided components instead of creating custom ones
2. **Spacing**: Use the grid gap and margin conventions
3. **Colors**: Use only the defined color variants
4. **Typography**: Use `heading-lg`, `heading-md`, `heading-sm`, `body`, `body-lg`, `tiny` classes
5. **Shadows**: Use `shadow-sm`, `shadow-lg`, `shadow-xl` for consistency
6. **Animations**: Apply animations to improve UX, not just for aesthetics
7. **Accessibility**: Always include `aria-labels` for icon-only buttons
8. **Dark Mode**: Test all pages in dark mode

## Example: Complete Page Refactoring

**Before (Old Style):**
```jsx
<div className="p-8">
  <h1>Students</h1>
  <table>...</table>
  <button>Add Student</button>
</div>
```

**After (New Style):**
```jsx
import { PageHeader, PageContainer, DataTable, Button } from "@/components/ui";
import { Plus, Users } from "lucide-react";

<PageContainer>
  <PageHeader 
    title="Students"
    subtitle="Manage student accounts"
    icon={Users}
    actions={[{ label: 'Add', icon: Plus, onClick: handleAdd }]}
  />
  <DataTable columns={columns} data={students} searchable paginated />
</PageContainer>
```

## Performance Tips

- Use `useMemo` for expensive computations
- Lazy load large tables with pagination
- Use React.memo for card components
- Avoid inline styles; use Tailwind classes
- Use virtual scrolling for very large lists

## Testing

Test each page for:
- [ ] Mobile responsiveness (sm, md, lg breakpoints)
- [ ] Dark mode visibility
- [ ] Keyboard navigation
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Hover/active states

---

**Version**: 1.0
**Last Updated**: 2026-06-25
