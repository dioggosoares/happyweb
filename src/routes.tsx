import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import OrphanagePending from './pages/OrphanagesPending';
import EditOrphanage from './pages/EditOrphanage';
import SelectionOrphanage from './pages/SelectionOrphanage';
import Done from './pages/Done';
import Delete from './pages/Delete';
import Preload from './pages/Preload';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* navigation */}
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />

        {/* Preload Dashboard */}
        <Route path="/preload" component={Preload} />

        {/* orphanages */}
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/edit/:id" component={EditOrphanage} />
        <Route path="/orphanages/selection/:id" component={SelectionOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />

        {/* restrict acess */}
        <Route path="/signin" component={Signin} />

        {/* Dashboard */}
        <Route path="/dashboard/registered" component={Dashboard} />
        <Route path="/dashboard/pending" component={OrphanagePending} />

        {/* validations */}
        <Route path="/done" component={Done} />
        <Route path="/delete/:id" component={Delete} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
