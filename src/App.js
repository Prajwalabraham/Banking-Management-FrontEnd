import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/User/Login';
import Register from './Pages/User/Register';
import SideAppbar from './Components/SideAppBar';
import UserDashboard from './Pages/User/UserDashboard';
import Deposit from './Pages/User/Deposit';
import Withdraw from './Pages/User/Withdraw';
import Balance from './Pages/User/Balance';
import Close from './Pages/User/Close';
import Modify from './Pages/User/Modify';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Register />} />
        <Route path="/UserDashboard" element={
          <div style={{ display: 'flex' }}>
          <div style={{ flex: '0 0 auto' }}>
            <SideAppbar
             />
          </div>
          <div style={{ flex: '1 1 auto' }}>
            <UserDashboard />
          </div>
        </div>
        } />
        <Route path="/Deposit" element={
          <div style={{ display: 'flex' }}>
          <div style={{ flex: '0 0 auto' }}>
            <SideAppbar
             />
          </div>
          <div style={{ flex: '1 1 auto' }}>
            <Deposit />
          </div>
        </div>
        } />
        <Route path="/Withdraw" element={
          <div style={{ display: 'flex' }}>
          <div style={{ flex: '0 0 auto' }}>
            <SideAppbar
             />
          </div>
          <div style={{ flex: '1 1 auto' }}>
            <Withdraw />
          </div>
        </div>
        } />
        <Route path="/Balance" element={
          <div style={{ display: 'flex' }}>
          <div style={{ flex: '0 0 auto' }}>
            <SideAppbar
             />
          </div>
          <div style={{ flex: '1 1 auto' }}>
            <Balance />
          </div>
        </div>
        } />
        <Route path="/Close" element={
          <div style={{ display: 'flex' }}>
          <div style={{ flex: '0 0 auto' }}>
            <SideAppbar
             />
          </div>
          <div style={{ flex: '1 1 auto' }}>
            <Close />
          </div>
        </div>
        } />
        <Route path="/Modify" element={
          <div style={{ display: 'flex' }}>
          <div style={{ flex: '0 0 auto' }}>
            <SideAppbar
             />
          </div>
          <div style={{ flex: '1 1 auto' }}>
            <Modify />
          </div>
        </div>
        } />
      </Routes>
    </BrowserRouter>
  </>

  );
}

export default App;
