// import React from 'react';
// import { createBrowserHistory } from 'history';
// import './header.css';
// import { Router } from 'react-router';
// import { BrowserRouter as Routes, Route } from 'react-router-dom';
// import AboutPage from './AboutPage';

// <Router>
// <Routes>
//         <Route path="/about" component={AboutPage} />
//       </Routes>
// </Router>
// const history = createBrowserHistory();

// const navigateTo = (path) => {
//   history.push(path);
// };

// const Header = () => {
//   return (
//     <header>
//       <nav className='menu'>
//         <ul className='menu-ul'>
//           <li className="menu-item">
//             <button onClick={() => navigateTo('/about')}>О сервисе</button>
//           </li>
//           <li className="menu-item"> 
//             <button onClick={() => navigateTo('/login')}>Авторизоваться</button>
//           </li>
//           <li className="menu-item">
//             <button onClick={() => navigateTo('/report-theft')}>Сообщить о краже</button>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;

import React from 'react';
import AboutPage from './AboutPage';
import AuthComponent from './AuthComponent';
import ReportTheft from './ReportTheftPage';
import Registration from './Registration';
import EmployeeList from './EmployeeList';
import './header.css';

const Reporttheft = () => <div><ReportTheft/></div>;
const About = () => <div><AboutPage/></div>;
const Login = () => <div><AuthComponent/></div>;
const Registr = () => <div><Registration/></div>;
const Employee = () => <div><EmployeeList/></div>;
const NotFound = () => <div>404</div>;

class Header extends React.Component {
  state = { location: window.location };

  handleClick = event => {
    event.preventDefault();
    window.history.pushState(null, null, event.target.href);
    this.setState({ location: window.location});
  };

  

  handlePopState = () => {
    this.setState({ location: window.location });
  };

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopState);
  }

  render() {
    let RouteItem;
    const { location } = this.state;

    switch (location.pathname) {
      case '/report':
        RouteItem = Reporttheft;
        break;
      case '/about':
        RouteItem = About;
        break;
        case '/login':
        RouteItem = Login;
        break;
        case '/registration':
        RouteItem = Registr;
        break;
        case '/employeelist':
          RouteItem = Employee;
          break;
      default:
        RouteItem = NotFound;
    }

    return (
      <div className='menu1'>
        <ul className='menu-ul'>

        <li className="menu-item">
            <a className='menu-a' href="/registration" onClick={this.handleClick}>
              Зарегистрироваться
            </a>
          </li>
          
          <li className="menu-item">
            <a className='menu-a' href="/login" onClick={this.handleClick}>
              Авторизоваться
            </a>
          </li>
          <li className="menu-item menu-item2">
            <a className='menu-a' href="/about" onClick={this.handleClick}>
            О сервисе
            </a>
          </li>
          <li className="menu-item">
            <a className='menu-a' href="/report" onClick={this.handleClick}>
              Сообщить о краже
            </a>
          </li>
          <li className="menu-item">
            <a className='menu-a' href="/employeelist" onClick={this.handleClick}>
              Список сотрудников
            </a>
          </li>
        </ul>
        <RouteItem />
      </div>
    );
  }
}

export default Header;