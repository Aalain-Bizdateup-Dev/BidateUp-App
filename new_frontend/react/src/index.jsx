// third party
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from './contexts/ConfigContext';

// project imports
import App from './App';
import reportWebVitals from './reportWebVitals';

// style + assets
import './index.scss';
import Employee_context_Second from './views/Add_Employee/employee_context';

// -----------------------|| REACT DOM RENDER  ||-----------------------//

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
<Employee_context_Second>
<ConfigProvider>
    <App />
  </ConfigProvider>
</Employee_context_Second>
);

reportWebVitals();
