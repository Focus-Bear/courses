import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { ROUTES, TOKEN_ROLES_KEY } from 'constants/routes';
import { useLazyGetUserDetailsQuery } from 'store/reducer/api';
import Layout from 'components/layout';
import { useAppDispatch } from 'store';
import { updateIsAdmin } from 'store/reducer/user';
import { USER_ROLES } from 'constants/enum';
import { t } from 'i18next';

const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [getUserDetails, { isLoading, isFetching }] =
    useLazyGetUserDetailsQuery();
  const isFetchingOrLoading = isFetching || isLoading;

  useEffect(() => {
    if (user) {
      if (user?.[TOKEN_ROLES_KEY]?.includes(USER_ROLES.ADMIN)) {
        dispatch(updateIsAdmin(true));
        navigate(ROUTES.ADMIN);
      } else {
        navigate(ROUTES.DASHBOARD);
      }
      getUserDetails();
    }
  }, [user]);

  return user ? (
    <Layout>
      <Outlet />
      {isFetchingOrLoading && (
        <small className='w-full font-semibold absolute bottom-1 left-1 animate-pulse'>
          {t('fetching_user_data')}
        </small>
      )}
    </Layout>
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
};

export default ProtectedRoute;
