import { AuthContext } from '../auth';
import { useContext } from 'react';
import {signOut} from '../auth';
const NavBar = () => {
  const {currentUser} = useContext(AuthContext);
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" data-toggle="tooltip" data-placement="bottom" title="Home page: Welcome to the Bank. Navigate to get started!" href="#">The Financial Crimes</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              { !currentUser ? 
             (
              <>
              <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="New Here? Go here to create an account (You'll get $100 upon creation!)">
                <a className="nav-link" href="#/createaccount/">Create Account</a>
              </li>
              <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Come on and login using email/password or SSO!">
                <a className="nav-link" href="#/login/">Login</a>
              </li>
              </>) : null}
              {!!currentUser ? 
               (
               <>
               <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Come here to deposit all your moneys!">
               <a className="nav-link" href="#/deposit/">Deposit</a>
             </li>
             <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Come here to Withdraw all your moneys!">
               <a className="nav-link" href="#/withdraw/">Withdraw</a>
             </li>
             <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Transfer some money to your friends!">
               <a className="nav-link" href="#/transfer/">e-Transfer</a>
             </li>
             <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Let's see what you have been upto!">
               <a className="nav-link" href="#/alldata/">AllData</a>
             </li>
             </>)    : null }
            </ul>
          </div>
        <a className="navbar-brand" data-toggle="tooltip" data-placement="bottom" title="Your name">{`${(currentUser && currentUser.email) || ''}   `}
        {currentUser ? <button className="btn btn-primary" type="submit" onClick={signOut}>Sign out</button> : null}
        </a>
        </nav>
        </>
      );
};

export default NavBar;