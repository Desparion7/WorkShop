import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList';
import UsersList from './features/users/UsersList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import EditNote from './features/notes/EditNote';
import NewNote from './features/notes/NewNote';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { ROLES } from './config/roles';
import useTitle from './hooks/useTitle';

function App() {
	useTitle('CarsWoś')
	return (
		<Routes>
			<Route path='WorkShop_frontend' element={<Layout />}>
				{/* Public routes */}
				<Route index element={<Public />} />
				<Route path='WorkShop_frontend/login' element={<Login />} />
				{/* Protected routes */}
				<Route element={<PersistLogin />}>
					<Route
						element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
					>
						<Route element={<Prefetch />}>
							<Route path='WorkShop_frontend/dash' element={<DashLayout />}>
								<Route index element={<Welcome />} />
								<Route
									element={
										<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]} />
									}
								>
									<Route path='WorkShop_frontend/users'>
										<Route index element={<UsersList />} />
										<Route path='WorkShop_frontend/:id' element={<EditUser />} />
										<Route path='WorkShop_frontend/new' element={<NewUserForm />} />
									</Route>
								</Route>

								<Route path='WorkShop_frontend/notes'>
									<Route index element={<NotesList />} />
									<Route path='WorkShop_frontend/:id' element={<EditNote />} />
									<Route path='WorkShop_frontend/new' element={<NewNote />} />
								</Route>
							</Route>{' '}
						</Route>{' '}
						{/*End dash route*/}
					</Route>
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
