import useAsync from '../useAsync';

import * as oauthApi from '../../services/oauthApi';

export default function useOAuth() {
  const {
    loading: oauthLoading,
    error: oauthError,
    act: OAuthSignIn
  } = useAsync(oauthApi.signInOAuth, false);

  return {
    oauthLoading,
    oauthError,
    OAuthSignIn
  };
}
