import React, {lazy} from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';
import MainLayout from './../layout/MainLayout';

const DashboardDefault = lazy(() => import('../views/dashboard/Default'));
const AssignTaskList = lazy(() => import('../views/assignTaskList'));
const UnassignTaskList = lazy(() => import('../views/unassignTaskList'));
const CompleteTaskList = lazy(() => import('../views/completeTaskList'));
const UploadCSVFormat = lazy(() => import('../views/uploadCSVFormat'));
const UserList = lazy(() => import('../views/userList/UserList'));
const UserProfile = lazy(() => import('../views/userProfile'));
const ChangePassword = lazy(() => import('../views/changePassword'));
const UploadCopyPaste = lazy(() => import('../views/uploadCopyPaste'));
const UserAdd = lazy(() => import('../views/userAdd'));

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard',
                '/assign-task-list',
                '/unassign-task-list',
                '/complete-task-list',
                '/upload-csv-format',
                '/upload-copy-paste',
                '/users-list',
                '/users-profile',
                '/users-add',
                '/change-password',
            ]}
        >
            <MainLayout showBreadcrumb={true}>
                <Switch location={location} key={location.pathname}>
                    <Route path="/dashboard" component={DashboardDefault} />
                    <Route path="/assign-task-list" component={AssignTaskList}/>
                    <Route path="/unassign-task-list" component={UnassignTaskList}/>
                    <Route path="/complete-task-list" component={CompleteTaskList}/>
                    <Route path="/upload-csv-format" component={UploadCSVFormat}/>
                    <Route path="/upload-copy-paste" component={UploadCopyPaste}/>
                    <Route path="/users-list" component={UserList}/>
                    <Route path='/users-profile' component={UserProfile}/>
                    <Route path='/users-add' component={UserAdd}/>
                    <Route path='/change-password' component={ChangePassword}/>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
