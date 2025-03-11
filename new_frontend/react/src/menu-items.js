// Menu configuration for default layout
const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'collapse',
          icon: 'material-icons-two-tone',
          iconname: 'home',
          children: [
            {
              id: 'sales',
              title: 'Sales',
              type: 'item',
              url: '/dashboard/sales'
            }
          ]
        }
      ]
    },
    {
      id: 'ui-element',
      title: '',
      subtitle: 'UI Components',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'dept',
          title: 'Create Departments',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'color_lens',
          url: '/create-depts'
        },
        {
          id: 'departments',
          title: 'Departments',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'text_fields',
          url: '/departments'
        },
        {
          id: 'dashboard_main',
          title: 'Dashboard_main',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'text_fields',
          url: '/dashboard_main'
        },
        {
          id: 'upload_kpi',
          title: 'Upload KPI',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'text_fields',
          url: '/upload-kpi'
        },
        {
          id: 'enter_kpi',
          title: 'Enter KPI',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'text_fields',
          url: '/enter-kpi'
        },
        {
          id: 'employee',
          title: 'Employees',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'text_fields',
          url: '/employee'
        },
        {
          id: 'add_employee',
          title: 'Add Employee',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'text_fields',
          url: '/add-employee'
        },

       
        
       
        {
          id: 'icons',
          title: 'Icons',
          type: 'collapse',
          icon: 'material-icons-two-tone',
          iconname: 'history_edu',
          children: [
            {
              id: 'feather',
              title: 'Feather',
              type: 'item',
              url: '/icons/Feather'
            },
            {
              id: 'font-awesome-5',
              title: 'Font Awesome',
              type: 'item',
              url: '/icons/font-awesome-5'
            },
            {
              id: 'material',
              title: 'Material',
              type: 'item',
              url: '/icons/material'
            }
          ]
        }
      ]
    },
    {
      id: '',
      title: '',
      subtitle: '15+ Redymade Pages',
      type: 'group',
      icon: 'icon-pages',
      children: [
        // {
        //   id: 'login',
        //   title: 'Login',
        //   type: 'item',
        //   icon: 'material-icons-two-tone',
        //   iconname: 'verified_user',
        //   url: '/login',
        //   target: true
        // },
        // {
        //   id: 'register',
        //   title: 'Register',
        //   type: 'item',
        //   icon: 'material-icons-two-tone',
        //   iconname: 'person_add_alt_1',
        //   url: '/register',
        //   target: true
        // },
      ]
    },
  ]
};

export default menuItems;
