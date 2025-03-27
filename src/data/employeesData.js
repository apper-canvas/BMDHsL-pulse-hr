const employees = [
  {
    id: 1,
    name: "Alex Johnson",
    position: "Senior Developer",
    department: "Engineering",
    email: "alex.johnson@pulsehr.com",
    phone: "(555) 123-4567",
    hireDate: "2019-04-12",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 2,
    name: "Samantha Lee",
    position: "Product Manager",
    department: "Product",
    email: "samantha.lee@pulsehr.com",
    phone: "(555) 234-5678",
    hireDate: "2020-01-15",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 3,
    name: "Michael Chen",
    position: "UX Designer",
    department: "Design",
    email: "michael.chen@pulsehr.com",
    phone: "(555) 345-6789",
    hireDate: "2018-08-21",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    position: "Marketing Specialist",
    department: "Marketing",
    email: "emily.rodriguez@pulsehr.com",
    phone: "(555) 456-7890",
    hireDate: "2021-03-10",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 5,
    name: "James Wilson",
    position: "Finance Manager",
    department: "Finance",
    email: "james.wilson@pulsehr.com",
    phone: "(555) 567-8901",
    hireDate: "2017-11-05",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 6,
    name: "Olivia Taylor",
    position: "HR Specialist",
    department: "Human Resources",
    email: "olivia.taylor@pulsehr.com",
    phone: "(555) 678-9012",
    hireDate: "2019-07-22",
    status: "On Leave",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 7,
    name: "David Brown",
    position: "Sales Representative",
    department: "Sales",
    email: "david.brown@pulsehr.com",
    phone: "(555) 789-0123",
    hireDate: "2020-09-18",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 8,
    name: "Sophia Martinez",
    position: "Customer Support Lead",
    department: "Support",
    email: "sophia.martinez@pulsehr.com",
    phone: "(555) 890-1234",
    hireDate: "2021-02-01",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 9,
    name: "Ethan Thompson",
    position: "DevOps Engineer",
    department: "Engineering",
    email: "ethan.thompson@pulsehr.com",
    phone: "(555) 901-2345",
    hireDate: "2018-06-14",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 10,
    name: "Ava Jackson",
    position: "Content Strategist",
    department: "Marketing",
    email: "ava.jackson@pulsehr.com",
    phone: "(555) 012-3456",
    hireDate: "2020-11-30",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 11,
    name: "Noah Garcia",
    position: "Data Analyst",
    department: "Analytics",
    email: "noah.garcia@pulsehr.com",
    phone: "(555) 123-4567",
    hireDate: "2019-10-08",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 12,
    name: "Isabella Clark",
    position: "Quality Assurance",
    department: "Engineering",
    email: "isabella.clark@pulsehr.com",
    phone: "(555) 234-5678",
    hireDate: "2021-04-15",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  }
];

export default employees;